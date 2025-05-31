import React, { useState } from "react";

// 1. Title Section Component
export const TitleSection = () => (
  <div className="bg-gray-100 rounded-xl p-8 mb-8 text-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">
      Онлайн проектирование кухни на заказ
    </h1>
    <p className="text-lg text-gray-600 max-w-4xl mx-auto">
      Воспользуйтесь нашим проектированием для расчета стоимости кухни online,
      мы гарантируем, что полученная в результате цена, будет конечной для
      Вашего проекта.
    </p>
  </div>
);

// Test component to see how it looks
const TestApp = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <TitleSection />
      </div>
    </div>
  );
};

export default TestApp;
