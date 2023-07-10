
const ProductFilter: React.FC = () => {
  return( 
  <div className="flex justify-center my-4 mb-8">
<div className="gap-8">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
      >
        <span className="text-sm font-medium relative"> Stock </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </summary>

      <div
        className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
      >
        <div className="w-96 rounded border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700"> 0 Seleccionados </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
            >
              Reset
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            <li>
              <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="FilterInStock"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">
                  En Stock (5+)
                </span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterPreOrder"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterPreOrder"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">
                  Pre Order (3+)
                </span>
              </label>
            </li>

            <li>
              <label
                htmlFor="FilterOutOfStock"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  id="FilterOutOfStock"
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span className="text-sm font-medium text-gray-700">
                  Fuera de Stock (10+)
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </details>
  </div>

  <div className="relative">
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary
        className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
      >
        <span className="text-sm font-medium relative"> Precio </span>

        <span className="transition group-open:-rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </summary>

      <div
        className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
      >
        <div className="w-96 rounded border border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700">
              El Precio Máximo es $600
            </span>

            <button
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
            >
              Reset
            </button>
          </header>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between gap-4">
              <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>

                <input
                  type="number"
                  id="FilterPriceFrom"
                  placeholder="From"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>

              <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>

                <input
                  type="number"
                  id="FilterPriceTo"
                  placeholder="To"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </details>
  </div>
</div>
) }

export default ProductFilter;