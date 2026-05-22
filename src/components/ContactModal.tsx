import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Contacts {
  phone_number: string;
  email_address: string;
  postal_address: string;
}

interface ContactModalProps {
  picture: string;
  name: string;
  job_title: string;
  contacts: Contacts;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  picture,
  name,
  job_title,
  contacts,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="cursor-pointer rounded-md border border-gray-200 bg-black/5 px-8 py-3 font-medium text-gray-600 hover:bg-gray-200 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-gray-900 md:py-3 md:px-10 md:text-base md:leading-6"
      >
        Contact me
      </button>

      <Dialog
        open={isOpen}
        onClose={closeModal}
        transition
        className="fixed inset-0 z-30 overflow-y-auto transition duration-300 ease-out data-closed:opacity-0"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition duration-300 ease-out data-closed:opacity-0 dark:bg-white/60"
        />

        <div className="flex min-h-screen items-center justify-center px-4 py-8 text-center">
          <DialogPanel
            transition
            className="z-50 my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition duration-300 ease-out data-closed:scale-95 data-closed:opacity-0 dark:bg-black"
          >
            <div className="flex flex-col items-center">
              <img
                alt={`${name} headshot`}
                src={picture}
                decoding="async"
                className="block h-48 w-48 rounded-full border-2 border-gray-500"
              />
              <DialogTitle
                as="h2"
                className="mt-4 text-2xl font-bold dark:text-white"
              >
                {name}
              </DialogTitle>
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
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
