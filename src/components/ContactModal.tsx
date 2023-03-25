import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const ContactModal: React.FC<any> = ({
  picture,
  name,
  job_title,
  contacts,
}) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md border border-gray-200 bg-black bg-opacity-5 px-8 py-3 font-medium text-gray-600 hover:bg-gray-200 dark:border-gray-700 dark:bg-white dark:bg-opacity-5 dark:text-gray-300 dark:hover:bg-gray-900 md:py-3 md:px-10 md:text-base md:leading-6"
      >
        Contact me
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm dark:bg-white dark:bg-opacity-60 "
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black">
                <div className="flex flex-col items-center">
                  <img
                    alt="Živorad Milekić headshot"
                    src={picture}
                    decoding="async"
                    data-nimg="intrinsic"
                    className="block h-48 w-48 rounded-full border-2 border-gray-500"
                  />
                  <h2 className="mt-4 text-2xl font-bold dark:text-white">
                    {name}
                  </h2>
                  <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">
                    {job_title}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="mt-4 flex gap-4 sm:items-center">
                    <div className="flex flex-col sm:w-full sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-medium dark:text-white">
                        Phone number:
                      </h3>
                      <a
                        className="text-base font-medium text-gray-500 dark:text-gray-400"
                        href={`tel:${contacts.phone_number}`}
                      >
                        {contacts.phone_number}
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-4 sm:items-center">
                    <div className="flex flex-col sm:w-full sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-medium dark:text-white">
                        E-mail address:
                      </h3>
                      <a
                        className="text-base font-medium text-gray-500 dark:text-gray-400"
                        href={`mailto:${contacts.email_address}`}
                      >
                        {contacts.email_address}
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-4 sm:items-center">
                    <div className="flex flex-col sm:w-full sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-medium dark:text-white">
                        Postal address:
                      </h3>
                      <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                        {contacts.postal_address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  <a
                    className="block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white no-underline hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 md:py-3 md:px-10 md:text-lg md:leading-6"
                    href="/docs/card.vcf"
                  >
                    + Add to contacts
                  </a>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
