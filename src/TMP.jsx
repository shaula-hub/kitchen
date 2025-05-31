const Section = ({ sectionData, materialsData, pricesData }) => {
  const sectionName = sectionData["Section name"];
  const sectionDescription = sectionData["Description"];
  const hasQuantity = sectionData["Qty"] === "YES";

  // Filter materials for this section
  const sectionMaterials = materialsData.filter(
    (material) => material["Section name"] === sectionName
  );

  const [selectedMaterial, setSelectedMaterial] = useState(
    sectionMaterials[0]?.Name || ""
  );
  const [selectedQuality, setSelectedQuality] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Get current material data
  const currentMaterial = sectionMaterials.find(
    (m) => m.Name === selectedMaterial
  );
  const currentPricing = pricesData.find(
    (p) => p["Section name"] === sectionName && p.Name === selectedMaterial
  );

  // Determine which radio buttons to show
  const getRadioButtonsConfig = () => {
    if (!currentPricing) return { show: false, buttons: [] };

    const buttons = [
      {
        key: "econom",
        label: "Econom",
        price: currentPricing["Econom-price"] || 0,
        text: currentPricing["Econom-text"] || "",
        active: (currentPricing["Econom-price"] || 0) > 0,
      },
      {
        key: "standard",
        label: "Standard",
        price: currentPricing["Standard-price"] || 0,
        text: currentPricing["Standard-text"] || "",
        active: (currentPricing["Standard-price"] || 0) > 0,
      },
      {
        key: "premium",
        label: "Premium",
        price: currentPricing["Premium-price"] || 0,
        text: currentPricing["Premium-text"] || "",
        active: (currentPricing["Premium-price"] || 0) > 0,
      },
    ];

    const hasAnyActiveButton = buttons.some((btn) => btn.active);
    return { show: hasAnyActiveButton, buttons };
  };

  const radioConfig = getRadioButtonsConfig();

  // Set default selection to first active button ONLY when material changes
  useEffect(() => {
    if (radioConfig.show && !selectedQuality) {
      const firstActive = radioConfig.buttons.find((btn) => btn.active);
      if (firstActive) {
        setSelectedQuality(firstActive.key);
      }
    }
  }, [selectedMaterial]); // Only depend on selectedMaterial, not radioConfig

  // Calculate current price
  const getCurrentPrice = () => {
    if (!currentPricing) return 0;

    if (radioConfig.show) {
      const selectedButton = radioConfig.buttons.find(
        (btn) => btn.key === selectedQuality
      );
      return selectedButton ? selectedButton.price * quantity : 0;
    } else {
      // If no radio buttons, use Econom price
      return (currentPricing["Econom-price"] || 0) * quantity;
    }
  };

  // Get current description text
  const getCurrentText = () => {
    if (!radioConfig.show) return "";
    const selectedButton = radioConfig.buttons.find(
      (btn) => btn.key === selectedQuality
    );
    return selectedButton ? selectedButton.text : "";
  };

  // Generate quantity options (0 to 100)
  const quantityOptions = Array.from({ length: 101 }, (_, i) => i);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-80">
        {/* Left side - Image (50% width) */}
        <div className="lg:w-1/2 bg-indigo-50 flex items-center justify-center p-6">
          <img
            src={`/img/${currentMaterial?.Filename || "placeholder.png"}`}
            alt={selectedMaterial}
            className="max-w-full max-h-full object-contain rounded-lg"
            onError={(e) => {
              e.target.src = "/img/placeholder.png";
            }}
          />
        </div>

        {/* Right side - Controls (50% width) */}
        <div className="lg:w-1/2 p-6 lg:p-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
            {sectionDescription}
          </h2>

          <div className="space-y-6">
            {/* Material Selection and Quantity in same row */}
            <div className="flex items-center gap-4">
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-64 p-3 border-2 border-gray-200 rounded-lg text-base bg-white focus:border-green-500 focus:outline-none transition-colors"
              >
                {sectionMaterials.map((material) => (
                  <option key={material.Name} value={material.Name}>
                    {material.Name}
                  </option>
                ))}
              </select>

              {/* Quantity Dropdown - Same layout as material dropdown */}
              {hasQuantity && (
                <div className="flex items-center gap-2">
                  <label className="font-semibold text-gray-700">Qty</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-20 p-3 border-2 border-gray-200 rounded-lg text-base bg-white focus:border-green-500 focus:outline-none transition-colors text-center"
                  >
                    {quantityOptions.map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Description - Fixed width */}
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300 max-w-2xl">
              <p className="text-gray-600 text-sm leading-relaxed">
                {currentMaterial?.["Name-description"] || ""}
              </p>
            </div>

            {/* Quality Radio Buttons - Compact layout */}
            {radioConfig.show && (
              <div className="space-y-4">
                <div className="font-semibold text-gray-700">Quality</div>
                <div className="flex gap-3">
                  {radioConfig.buttons.map((button) => (
                    <label
                      key={button.key}
                      className={classNames(
                        "cursor-pointer transition-all duration-200",
                        {
                          "cursor-not-allowed": !button.active,
                        }
                      )}
                    >
                      <input
                        type="radio"
                        name={`quality-${sectionName}`}
                        value={button.key}
                        checked={selectedQuality === button.key}
                        onChange={(e) => setSelectedQuality(e.target.value)}
                        disabled={!button.active}
                        className="sr-only"
                      />
                      <div
                        className={classNames(
                          "px-4 py-2 border-2 rounded-full text-center font-medium transition-all duration-200 min-w-20",
                          {
                            "bg-green-500 text-white border-green-500":
                              selectedQuality === button.key && button.active,
                            "bg-white text-gray-700 border-gray-200 hover:border-green-500":
                              selectedQuality !== button.key && button.active,
                            "bg-gray-100 text-gray-400 border-gray-200 opacity-50":
                              !button.active,
                          }
                        )}
                      >
                        {button.label}
                      </div>
                    </label>
                  ))}
                </div>
                <div className="text-sm text-gray-600 italic min-h-5 max-w-2xl">
                  {getCurrentText()}
                </div>
              </div>
            )}

            {/* Price Display - Compact width */}
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-green-100 w-fit ml-auto">
              <div className="text-2xl lg:text-3xl font-bold text-gray-800">
                {getCurrentPrice().toLocaleString()} ₽
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
