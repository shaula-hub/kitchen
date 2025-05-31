import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import classNames from "classnames";

const App = () => {
  const [sectionsData, setSectionsData] = useState([]);
  const [materialsData, setMaterialsData] = useState([]);
  const [pricesData, setPricesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [kitchenLength, setKitchenLength] = useState(100);
  const [kitchenLeftSide, setKitchenLeftSide] = useState(0);
  const [kitchenRightSide, setKitchenRightSide] = useState(0);
  const [kitchenLayout, setKitchenLayout] = useState("straight");

  const [measurementDistance, setMeasurementDistance] = useState(0);
  const [measurementRequested, setMeasurementRequested] = useState(false);

  const [additionalServices, setAdditionalServices] = useState({
    assembly: false,
    dishDrying: false,
    builtInTech: false,
    builtInFridge: false,
    stoveCutout: false,
    sinkCutout: false,
    lighting: false,
  });

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        // Fetch the file from public folder
        const response = await fetch("/prices.xlsx");
        if (!response.ok) {
          throw new Error("Failed to fetch Excel file");
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, {
          cellStyles: true,
          cellFormulas: true,
          cellDates: true,
        });

        const sections = XLSX.utils.sheet_to_json(workbook.Sheets["Sections"]);
        const materials = XLSX.utils.sheet_to_json(
          workbook.Sheets["Materisals"]
        );
        const prices = XLSX.utils.sheet_to_json(workbook.Sheets["Prices"]);

        setSectionsData(sections);
        setMaterialsData(materials);
        setPricesData(prices);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading Excel data:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadExcelData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading calculator...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* New Title Section */}
        <div className="bg-gray-100 rounded-xl p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Онлайн проектирование кухни на заказ
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Воспользуйтесь нашим проектированием для расчета стоимости кухни
            online, мы гарантируем, что полученная в результате цена, будет
            конечной для Вашего проекта.
          </p>
        </div>
        {/* Kitchen Layout Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-5">
          <div className="flex flex-col lg:flex-row min-h-80">
            {/* Left side - Kitchen diagram (50% width) */}
            <div className="lg:w-1/2 bg-indigo-50 flex items-center justify-center p-6">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-8 text-gray-800">
                  Введите длину кухни
                </h3>

                {/* Kitchen shape diagrams based on layout */}
                <div className="relative">
                  {/* Straight kitchen (default) */}
                  {kitchenLayout === "straight" && (
                    <div className="relative pt-16">
                      {/* Top input */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={kitchenLength}
                          onChange={(e) =>
                            setKitchenLength(parseInt(e.target.value) || 0)
                          }
                          className="w-16 p-1 border-2 border-gray-300 rounded text-center font-semibold"
                        />
                        <div className="text-xs text-gray-600 mt-1">см</div>
                      </div>
                      {/* Horizontal rectangle */}
                      <div className="bg-gray-300 w-80 h-16 rounded"></div>
                    </div>
                  )}

                  {/* Left corner kitchen */}
                  {kitchenLayout === "left" && (
                    <div className="relative pt-16">
                      {/* Top input */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={kitchenLength}
                          onChange={(e) =>
                            setKitchenLength(parseInt(e.target.value) || 0)
                          }
                          className="w-16 p-1 border-2 border-gray-300 rounded text-center font-semibold"
                        />
                        <div className="text-xs text-gray-600 mt-1">см</div>
                      </div>
                      {/* Left input */}
                      <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={kitchenLeftSide}
                          onChange={(e) =>
                            setKitchenLeftSide(parseInt(e.target.value) || 0)
                          }
                          className="w-12 p-1 border-2 border-gray-300 rounded text-center font-semibold"
                        />
                        <div className="text-xs text-gray-600 mt-1">см</div>
                      </div>
                      {/* L-shaped kitchen */}
                      <div className="flex">
                        <div className="bg-gray-300 w-16 h-32 rounded"></div>
                        <div className="bg-gray-300 w-64 h-16 rounded"></div>
                      </div>
                    </div>
                  )}

                  {/* Right corner kitchen */}
                  {kitchenLayout === "right" && (
                    <div className="relative pt-16">
                      {/* Top input */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={kitchenLength}
                          onChange={(e) =>
                            setKitchenLength(parseInt(e.target.value) || 0)
                          }
                          className="w-16 p-1 border-2 border-gray-300 rounded text-center font-semibold"
                        />
                        <div className="text-xs text-gray-600 mt-1">см</div>
                      </div>
                      {/* Right input */}
                      <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={kitchenRightSide}
                          onChange={(e) =>
                            setKitchenRightSide(parseInt(e.target.value) || 0)
                          }
                          className="w-12 p-1 border-2 border-gray-300 rounded text-center font-semibold"
                        />
                        <div className="text-xs text-gray-600 mt-1">см</div>
                      </div>
                      {/* Right L-shaped kitchen */}
                      <div className="flex">
                        <div className="bg-gray-300 w-64 h-16 rounded"></div>
                        <div className="bg-gray-300 w-16 h-32 rounded"></div>
                      </div>
                    </div>
                  )}

                  {/* U-shaped kitchen */}
                  {kitchenLayout === "u-shaped" && (
                    <div className="relative pt-16">
                      {/* Top input */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={kitchenLength}
                          onChange={(e) =>
                            setKitchenLength(parseInt(e.target.value) || 0)
                          }
                          className="w-16 p-1 border-2 border-gray-300 rounded text-center font-semibold"
                        />
                        <div className="text-xs text-gray-600 mt-1">см</div>
                      </div>
                      {/* Left input */}
                      <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={kitchenLeftSide}
                          onChange={(e) =>
                            setKitchenLeftSide(parseInt(e.target.value) || 0)
                          }
                          className="w-12 p-1 border-2 border-gray-300 rounded text-center font-semibold"
                        />
                        <div className="text-xs text-gray-600 mt-1">см</div>
                      </div>
                      {/* Right input */}
                      <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={kitchenRightSide}
                          onChange={(e) =>
                            setKitchenRightSide(parseInt(e.target.value) || 0)
                          }
                          className="w-12 p-1 border-2 border-gray-300 rounded text-center font-semibold"
                        />
                        <div className="text-xs text-gray-600 mt-1">см</div>
                      </div>
                      {/* U-shaped kitchen */}
                      <div className="flex">
                        <div className="bg-gray-300 w-16 h-32 rounded"></div>
                        <div className="bg-gray-300 w-64 h-16 rounded"></div>
                        <div className="bg-gray-300 w-16 h-32 rounded"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Warning message */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600">⚠️</span>
                    <span className="font-semibold text-blue-800">
                      Пожалуйста, введите общую длину Вашей кухни.
                    </span>
                  </div>
                  <p className="text-sm text-blue-600">
                    В наших расчетах мы используем стандартную высоту нижней
                    базы - 86 см, верхней базы - до 72 см
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Layout options (50% width) */}
            <div className="lg:w-1/2 p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
                Форма и размеры
              </h2>

              <div className="space-y-4">
                <div className="flex justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="kitchen-layout"
                      value="straight"
                      checked={kitchenLayout === "straight"}
                      onChange={(e) => setKitchenLayout(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`px-8 py-3 border-2 rounded-lg font-medium transition-all ${
                        kitchenLayout === "straight"
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                      }`}
                    >
                      Прямая
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="kitchen-layout"
                      value="left"
                      checked={kitchenLayout === "left"}
                      onChange={(e) => setKitchenLayout(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                        kitchenLayout === "left"
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                      }`}
                    >
                      Угловая левая
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="kitchen-layout"
                      value="right"
                      checked={kitchenLayout === "right"}
                      onChange={(e) => setKitchenLayout(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                        kitchenLayout === "right"
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                      }`}
                    >
                      Угловая правая
                    </div>
                  </label>
                </div>

                <div className="flex justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="kitchen-layout"
                      value="u-shaped"
                      checked={kitchenLayout === "u-shaped"}
                      onChange={(e) => setKitchenLayout(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`px-8 py-3 border-2 rounded-lg font-medium transition-all ${
                        kitchenLayout === "u-shaped"
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                      }`}
                    >
                      П-образная
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {sectionsData.map((section, index) => (
            <Section
              key={section["Section name"]}
              sectionData={section}
              materialsData={materialsData}
              pricesData={pricesData}
            />
          ))}
        </div>
        {/* Additional Services Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-5">
          <div className="p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
              Дополнительные услуги
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <button
                onClick={() =>
                  setAdditionalServices((prev) => ({
                    ...prev,
                    assembly: !prev.assembly,
                  }))
                }
                className={`p-4 border-2 rounded-lg font-medium transition-all ${
                  additionalServices.assembly
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                }`}
              >
                Сборка кухни
              </button>

              <button
                onClick={() =>
                  setAdditionalServices((prev) => ({
                    ...prev,
                    dishDrying: !prev.dishDrying,
                  }))
                }
                className={`p-4 border-2 rounded-lg font-medium transition-all ${
                  additionalServices.dishDrying
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                }`}
              >
                Сушка для посуды
              </button>

              <button
                onClick={() =>
                  setAdditionalServices((prev) => ({
                    ...prev,
                    builtInTech: !prev.builtInTech,
                  }))
                }
                className={`p-4 border-2 rounded-lg font-medium transition-all ${
                  additionalServices.builtInTech
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                }`}
              >
                Установка встраиваемой техники
              </button>

              <button
                onClick={() =>
                  setAdditionalServices((prev) => ({
                    ...prev,
                    builtInFridge: !prev.builtInFridge,
                  }))
                }
                className={`p-4 border-2 rounded-lg font-medium transition-all ${
                  additionalServices.builtInFridge
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                }`}
              >
                Встраиваемый холодильник
              </button>

              <button
                onClick={() =>
                  setAdditionalServices((prev) => ({
                    ...prev,
                    stoveCutout: !prev.stoveCutout,
                  }))
                }
                className={`p-4 border-2 rounded-lg font-medium transition-all ${
                  additionalServices.stoveCutout
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                }`}
              >
                Врезка плиты
              </button>

              <button
                onClick={() =>
                  setAdditionalServices((prev) => ({
                    ...prev,
                    sinkCutout: !prev.sinkCutout,
                  }))
                }
                className={`p-4 border-2 rounded-lg font-medium transition-all ${
                  additionalServices.sinkCutout
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                }`}
              >
                Врезка раковины
              </button>

              <button
                onClick={() =>
                  setAdditionalServices((prev) => ({
                    ...prev,
                    lighting: !prev.lighting,
                  }))
                }
                className={`p-4 border-2 rounded-lg font-medium transition-all ${
                  additionalServices.lighting
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-500"
                }`}
              >
                Подключение подсветки
              </button>
            </div>
          </div>
        </div>
        {/* Choice Summary Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-5">
          <div className="p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
              Ваш выбор
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Наименование
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Материал
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Качество
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Количество
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      Цена
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Material Sections */}
                  {(() => {
                    let totalMaterialsCost = 0;
                    return sectionsData.map((section, index) => {
                      // Get materials for this section
                      const sectionMaterials = materialsData.filter(
                        (material) =>
                          material["Section name"] === section["Section name"]
                      );
                      const firstMaterial = sectionMaterials[0]?.Name || "";

                      // Get pricing for first material (placeholder logic)
                      const currentPricing = pricesData.find(
                        (p) =>
                          p["Section name"] === section["Section name"] &&
                          p.Name === firstMaterial
                      );

                      // Determine quality and price (simplified for display)
                      const hasQuantity = section["Qty"] === "YES";
                      const quantity = hasQuantity ? 1 : "-";

                      // Check if all prices are the same to determine quality display
                      let quality = "-";
                      let price = 0;

                      if (currentPricing) {
                        const prices = [
                          currentPricing["Econom-price"] || 0,
                          currentPricing["Standard-price"] || 0,
                          currentPricing["Premium-price"] || 0,
                        ];

                        const allSame =
                          prices[0] === prices[1] && prices[1] === prices[2];

                        if (!allSame) {
                          // Find first non-zero price for quality
                          if (prices[0] > 0) quality = "Эконом";
                          else if (prices[1] > 0) quality = "Стандарт";
                          else if (prices[2] > 0) quality = "Премиум";

                          price =
                            prices[0] > 0
                              ? prices[0]
                              : prices[1] > 0
                              ? prices[1]
                              : prices[2];
                        } else {
                          price = prices[0];
                        }

                        if (hasQuantity) price *= 1; // multiply by quantity

                        totalMaterialsCost += price;
                      }
                      window.totalMaterialsCost = totalMaterialsCost;

                      return (
                        <tr
                          key={section["Section name"]}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 font-medium text-gray-800">
                            {section["Description"]}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {firstMaterial}
                          </td>
                          <td className="py-3 px-4">
                            {quality !== "-" ? (
                              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                {quality}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-600">
                            {quantity}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-800">
                            {price > 0 ? `${price.toLocaleString()} ₽` : "-"}
                          </td>
                        </tr>
                      );
                    });
                  })()}
                  {/* Additional Services - Only Active Ones */}
                  {Object.entries(additionalServices)
                    .filter(([serviceKey, isActive]) => isActive)
                    .map(([serviceKey, isActive]) => {
                      const serviceNames = {
                        assembly: "Сборка кухни",
                        dishDrying: "Сушка для посуды",
                        builtInTech: "Установка встраиваемой техники",
                        builtInFridge: "Встраиваемый холодильник",
                        stoveCutout: "Врезка плиты",
                        sinkCutout: "Врезка раковины",
                        lighting: "Подключение подсветки",
                      };

                      const serviceName = serviceNames[serviceKey];
                      const price = 11111;

                      return (
                        <tr
                          key={serviceKey}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4 font-medium text-gray-800">
                            Дополнительные услуги
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {serviceName}
                          </td>
                          <td className="py-3 px-4">
                            {/* Quality column - blank for services */}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-600">
                            {/* Quantity column - blank for services */}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-800">
                            {price.toLocaleString()} ₽
                          </td>
                        </tr>
                      );
                    })}{" "}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Kitchen Measurement Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-5">
          <div className="p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
              Выезд замерщика
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600">
                Выезд замерщика в пределах Кирова –{" "}
                <span className="font-semibold text-green-600">бесплатно!</span>
              </p>

              <p className="text-gray-600">
                Если вы находитесь в Кировской области, то введите километраж,
                чтобы узнать стоимость выезда.
              </p>

              <p className="font-semibold text-gray-800">
                В случае заказа кухни стоимость выезда вычитается из стоимости
                кухни.
              </p>

              <div className="flex items-center gap-4 mt-6">
                <label className="text-gray-700 font-medium">
                  Введите километраж от Кирова до вашего дома
                </label>
                <input
                  type="number"
                  min="0"
                  value={measurementDistance}
                  onChange={(e) =>
                    setMeasurementDistance(parseInt(e.target.value) || 0)
                  }
                  className="w-20 p-2 border-2 border-gray-300 rounded text-center font-semibold"
                />
                <span className="text-gray-600">км</span>
                <span className="font-semibold text-gray-800">
                  Стоимость выезда:{" "}
                  <span className="text-green-600">
                    {(measurementDistance * 20).toLocaleString()} ₽
                  </span>
                </span>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setMeasurementRequested(!measurementRequested)}
                  className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                    measurementRequested
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white text-green-600 border-green-500 hover:bg-green-50"
                  }`}
                >
                  Заказать выезд
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-5">
          <div className="p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
              Стоимость Вашего проекта
            </h2>

            <div className="space-y-4">
              {/* Materials Cost */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Материалы</span>
                <span className="text-lg font-semibold text-green-600">
                  {(window.totalMaterialsCost || 0).toLocaleString()} ₽
                </span>
              </div>

              {/* Additional Services Cost - only show if any service is active */}
              {Object.values(additionalServices).some((service) => service) && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Услуги</span>
                  <span className="text-lg font-semibold text-green-600">
                    {(
                      Object.values(additionalServices).filter(Boolean).length *
                      11111
                    ).toLocaleString()}{" "}
                    ₽
                  </span>
                </div>
              )}

              {/* Measurement Cost - only show if requested and distance > 0 */}
              {measurementRequested && measurementDistance > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Выезд замерщика</span>
                  <span className="text-lg font-semibold text-green-600">
                    {(measurementDistance * 20).toLocaleString()} ₽
                  </span>
                </div>
              )}

              {/* Divider */}
              <hr className="border-gray-200 my-4" />

              {/* Total */}
              <div className="flex justify-between items-center py-2 bg-green-50 px-4 rounded-lg">
                <span className="text-xl font-bold text-gray-800">
                  Общая цена
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {(() => {
                    const materials = window.totalMaterialsCost;
                    const services =
                      Object.values(additionalServices).filter(Boolean).length *
                      11111;
                    const measurement =
                      measurementRequested && measurementDistance > 0
                        ? measurementDistance * 20
                        : 0;
                    return (
                      materials +
                      services +
                      measurement
                    ).toLocaleString();
                  })()}{" "}
                  ₽
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Description Section */}
        <div className="bg-gray-100 rounded-xl p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Как работает конфигуратор?
          </h2>

          <div className="max-w-4xl mx-auto space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Стоимость – один из основных критериев выбора кухонного гарнитура,
              наряду с функциональностью и внешним видом. Опция «онлайн
              конфигуратор» позволит вам в режиме реального времени
              конструировать кухонный гарнитур под индивидуальные запросы и
              бюджет.
            </p>

            <p>
              Как устроен калькулятор расчета кухни? Вы самостоятельно выбираете
              необходимые параметры – стиль модели, форму и габариты корпуса,
              цвет и материал фасадов, столешницу, фартук, количество ящиков,
              фурнитуру. В зависимости от выбранной категории комплектующих
              («эконом», «стандарт», «премиум») автоматически меняется финальная
              стоимость заказа.
            </p>

            <p>
              Конфигуратор онлайн для точного расчета кухни на заказ, во-первых,
              экономит ваше время, ведь вы видите цену подходящей модели online,
              а не запрашиваете её у менеджера. Во-вторых, проектирование
              позволяет контролировать финальное ценовое предложение, не выходя
              за рамки запланированного бюджета. Например, если для вас
              принципиальным является премиальное покрытие фасадов, вы можете
              дополнить комплектацию более доступной по цене столешницей и
              фурнитурой.
            </p>

            <p>
              Вместе с самим гарнитуром вы можете посчитать сопутствующие услуги
              – сборку, врезку и подключение бытовой техники, монтаж освещения.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

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

    const allPricesSame =
      buttons[0].price === buttons[1].price &&
      buttons[1].price === buttons[2].price;
    return { show: !allPricesSame, buttons };
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
  }, [selectedQuality, sectionMaterials, radioConfig, selectedMaterial]); // Only depend on selectedMaterial, not radioConfig

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

export default App;
