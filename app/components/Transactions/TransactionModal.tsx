"use client";
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TransactionModalProps } from '@/app/types';


export default function TransactionModal({
  isOpen,
  onClose,
  type,
  assetName,
  assetSymbol,
  currentPrice,
  quantity,
  onQuantityChange,
  onConfirm,
  isSubmitting
}: TransactionModalProps) {
  const isBuy = type === 'buy';
  const buttonColor = isBuy ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';
  const actionText = isBuy ? 'Buy' : 'Sell';
  const confirmText = isBuy ? 'Confirm Purchase' : 'Confirm Sale';
  const totalText = isBuy ? 'Total Cost (USD)' : 'Total Value (USD)';
  const amountText = `Amount to ${actionText} (${assetSymbol})`;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all border border-zinc-700">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-white"
                  >
                    {actionText} {assetName}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-zinc-400 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      Current Price
                    </label>
                    <div className="bg-zinc-700 rounded-md py-3 px-4 text-white font-medium">
                      ${currentPrice?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) || '0.00'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      {amountText}
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => onQuantityChange(e.target.value)}
                      placeholder="0.01"
                      step="0.001"
                      min="0.001"
                      className="w-full bg-zinc-700 border border-zinc-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">
                      {totalText}
                    </label>
                    <div className="bg-zinc-700 rounded-md py-3 px-4 text-white font-medium">
                      $
                      {currentPrice
                        ? (
                            parseFloat(quantity || '0') * currentPrice
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "0.00"}
                    </div>
                  </div>

                  <div className="bg-zinc-700/50 rounded-md p-3 text-sm text-zinc-300">
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-amber-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      This is a simulated transaction. No real assets will be {isBuy ? 'purchased' : 'sold'}.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button
                    type="button"
                    className="flex-1 bg-zinc-700 text-white py-2 px-4 rounded-md hover:bg-zinc-600 transition-colors"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`flex-1 ${buttonColor} text-white py-2 px-4 rounded-md transition-colors flex justify-center items-center`}
                    onClick={onConfirm}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      confirmText
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}