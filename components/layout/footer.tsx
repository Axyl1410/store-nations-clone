"use client";

export default function Footer() {
  return (
    <>
      <div className="border-primary grid-cols-4 border-t lg:grid">
        <div className="bg-primary text-background border-background border-b p-5 font-bold lg:border-r lg:border-b-0">
          <div className="inline-block text-left">
            <ul className="list-none space-y-1">
              <li>
                <a
                  href="#"
                  className="hover:text-scheme-accent font-heading font-bold"
                >
                  Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-scheme-accent font-heading font-bold"
                >
                  Tracking order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-scheme-accent font-heading font-bold"
                >
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-scheme-accent font-heading font-bold"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-scheme-accent font-heading font-bold"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Box 2 */}

        <div className="bg-primary text-background border-background border-b p-5 font-bold lg:border-r lg:border-b-0">
          <div className="inline-block text-left">
            <ul className="list-none space-y-1">
              <li>
                <a
                  href="#"
                  className="hover:text-scheme-accent font-heading font-bold"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-scheme-accent font-heading font-bold"
                >
                  Cool stuff we love
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-background bg-primary border-background border-b p-5 lg:border-r lg:border-b-0">
          <div>
            <div className="inline-block text-left">
              <div className="font-heading mb-4 text-base font-bold">
                SOCIAL MEDIA
              </div>
              <ul className="-ml-2" data-color-scheme="scheme3">
                <li className="mb-2 ml-2 inline-block">
                  <a
                    className="hover:text-scheme-accent fill-current"
                    href="https://www.facebook.com/stressmama.closet"
                    target="_blank"
                  >
                    <span className="inline-block h-8 w-8" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon fill-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2.037c-5.523 0-10 4.477-10 10 0 4.69 3.229 8.624 7.584 9.705v-6.65H7.522v-3.055h2.062V10.72c0-3.404 1.54-4.981 4.882-4.981.634 0 1.727.124 2.174.248v2.77a12.853 12.853 0 0 0-1.155-.037c-1.64 0-2.273.621-2.273 2.236v1.08h3.266l-.561 3.056h-2.705v6.871C18.163 21.365 22 17.15 22 12.037c0-5.523-4.477-10-10-10Z"
                        />
                      </svg>
                    </span>
                    <span className="sr-only">Facebook</span>
                  </a>
                </li>
                <li className="mb-2 ml-2 inline-block">
                  <a
                    className="hover:text-scheme-accent fill-current"
                    href="https://x.com/STRESSMAMA_"
                    target="_blank"
                  >
                    <span className="inline-block h-8 w-8" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon fill-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                      >
                        <path
                          fill="currentColor"
                          d="M17.751 2.96h3.067l-6.7 7.659L22 21.039h-6.172l-4.833-6.32-5.531 6.32h-3.07l7.167-8.19L2 2.96h6.328l4.37 5.777L17.75 2.96Zm-1.076 16.243h1.7L7.404 4.7H5.58l11.094 14.503Z"
                        />
                      </svg>
                    </span>
                    <span className="sr-only">X</span>
                  </a>
                </li>
                <li className="mb-2 ml-2 inline-block">
                  <a
                    className="hover:text-scheme-accent fill-current"
                    href="https://www.pinterest.com/stressmamaofficial/"
                    target="_blank"
                  >
                    <span className="inline-block h-8 w-8" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon fill-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.238 2.637 7.855 6.355 9.313-.085-.793-.168-2.004.036-2.868l1.171-4.968s-.3-.598-.3-1.485c0-1.39.804-2.43 1.808-2.43.852 0 1.266.641 1.266 1.41 0 .86-.547 2.141-.828 3.329-.235.996.5 1.808 1.48 1.808 1.778 0 3.145-1.875 3.145-4.578 0-2.394-1.719-4.07-4.176-4.07-2.844 0-4.516 2.133-4.516 4.34 0 .86.332 1.781.747 2.281a.299.299 0 0 1 .07.285c-.074.317-.246.996-.278 1.133-.043.184-.144.223-.335.133-1.25-.582-2.032-2.406-2.032-3.875 0-3.156 2.293-6.051 6.606-6.051 3.469 0 6.164 2.473 6.164 5.777 0 3.446-2.172 6.22-5.188 6.22-1.011 0-1.965-.528-2.293-1.15 0 0-.5 1.91-.62 2.38-.227.867-.837 1.957-1.243 2.62.938.29 1.93.446 2.961.446 5.523 0 10-4.477 10-10S17.523 2 12 2Z"
                        />
                      </svg>
                    </span>
                    <span className="sr-only">Pinterest</span>
                  </a>
                </li>
                <li className="mb-2 ml-2 inline-block">
                  <a
                    className="hover:text-scheme-accent fill-current"
                    href="https://www.instagram.com/stress.mama/"
                    target="_blank"
                  >
                    <span className="inline-block h-8 w-8" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon fill-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12.006 3.801c2.672 0 2.989.012 4.04.059.977.043 1.504.207 1.855.344a3.1 3.1 0 0 1 1.15.746c.35.351.566.684.745 1.148.137.352.301.883.344 1.856.047 1.055.059 1.372.059 4.04 0 2.672-.012 2.989-.059 4.04-.043.977-.207 1.504-.344 1.856-.18.465-.398.8-.746 1.148a3.076 3.076 0 0 1-1.149.747c-.351.137-.882.3-1.855.343-1.055.047-1.372.06-4.04.06-2.673 0-2.989-.013-4.04-.06-.977-.042-1.504-.206-1.856-.343-.465-.18-.8-.399-1.148-.747a3.076 3.076 0 0 1-.747-1.148c-.136-.352-.3-.883-.344-1.856-.046-1.055-.058-1.371-.058-4.04 0-2.672.012-2.989.058-4.04.043-.976.208-1.504.344-1.856.18-.464.399-.8.747-1.148a3.076 3.076 0 0 1 1.148-.746c.352-.137.883-.301 1.856-.344 1.051-.047 1.367-.059 4.04-.059Zm0-1.801c-2.716 0-3.055.012-4.122.059-1.063.046-1.793.218-2.426.465A4.882 4.882 0 0 0 3.684 3.68a4.9 4.9 0 0 0-1.157 1.77c-.246.637-.418 1.363-.464 2.426-.047 1.07-.06 1.41-.06 4.126 0 2.715.013 3.055.06 4.122.046 1.063.218 1.793.464 2.426.258.66.598 1.22 1.157 1.774a4.89 4.89 0 0 0 1.77 1.152c.637.247 1.363.419 2.426.465 1.067.047 1.407.059 4.122.059s3.055-.012 4.122-.059c1.063-.046 1.793-.218 2.426-.464a4.89 4.89 0 0 0 1.77-1.153 4.888 4.888 0 0 0 1.152-1.77c.247-.637.419-1.363.465-2.426.047-1.067.06-1.407.06-4.122 0-2.716-.013-3.055-.06-4.122-.046-1.063-.218-1.793-.465-2.426a4.684 4.684 0 0 0-1.144-1.778 4.889 4.889 0 0 0-1.77-1.153c-.637-.246-1.364-.418-2.426-.464-1.07-.051-1.41-.063-4.126-.063Zm0 4.864a5.139 5.139 0 0 0-5.138 5.138 5.139 5.139 0 0 0 5.138 5.138 5.14 5.14 0 0 0 5.138-5.138 5.139 5.139 0 0 0-5.138-5.138Zm0 8.47a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.667Zm5.34-7.474a1.2 1.2 0 1 0 0-2.399 1.2 1.2 0 0 0 0 2.4Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="sr-only">Instagram</span>
                  </a>
                </li>
                <li className="mb-2 ml-2 inline-block">
                  <a
                    className="hover:text-scheme-accent fill-current"
                    href="https://www.tiktok.com/@stressmama.streetwear"
                    target="_blank"
                  >
                    <span className="inline-block h-8 w-8" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon fill-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                      >
                        <path
                          fill="currentColor"
                          d="M16.019 2h-3.37v13.623c0 1.623-1.297 2.957-2.91 2.957-1.614 0-2.91-1.334-2.91-2.957 0-1.594 1.267-2.898 2.823-2.956v-3.42c-3.428.057-6.194 2.869-6.194 6.376C3.458 19.16 6.282 22 9.768 22c3.485 0 6.308-2.87 6.308-6.377V8.638a7.805 7.805 0 0 0 4.466 1.507v-3.42C18.006 6.638 16.019 4.55 16.019 2Z"
                        />
                      </svg>
                    </span>
                    <span className="sr-only">TikTok</span>
                  </a>
                </li>
                <li className="mb-2 ml-2 inline-block">
                  <a
                    className="hover:text-scheme-accent fill-current"
                    href="https://www.threads.net/@stress.mama"
                    target="_blank"
                  >
                    <span className="inline-block h-8 w-8" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon fill-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                      >
                        <path
                          fill="currentColor"
                          d="M16.786 11.27a6.936 6.936 0 0 0-.262-.12c-.155-2.844-1.709-4.472-4.319-4.49h-.035c-1.561 0-2.86.667-3.659 1.88l1.436.984c.597-.905 1.534-1.098 2.224-1.098h.023c.86.005 1.508.255 1.928.742.305.355.51.845.61 1.464-.761-.13-1.585-.17-2.466-.12-2.481.144-4.077 1.59-3.97 3.602.055 1.02.563 1.897 1.431 2.47.734.485 1.68.722 2.663.668 1.297-.07 2.315-.566 3.025-1.471.54-.688.881-1.579 1.032-2.701.618.373 1.076.864 1.33 1.455.43 1.003.455 2.652-.89 3.997-1.18 1.178-2.597 1.688-4.739 1.703-2.376-.017-4.173-.78-5.341-2.264-1.094-1.391-1.66-3.4-1.68-5.971.02-2.571.586-4.58 1.68-5.97 1.168-1.486 2.965-2.248 5.341-2.265 2.393.017 4.221.783 5.434 2.275.595.732 1.044 1.653 1.34 2.726l1.681-.45c-.358-1.32-.922-2.458-1.69-3.402C17.36 3.001 15.085 2.02 12.154 2h-.01c-2.925.02-5.174 1.004-6.685 2.925-1.344 1.709-2.038 4.087-2.061 7.068v.014c.023 2.98.717 5.359 2.061 7.068 1.51 1.92 3.76 2.905 6.684 2.925h.012c2.6-.018 4.433-.699 5.942-2.207 1.976-1.974 1.916-4.447 1.265-5.966-.467-1.089-1.357-1.973-2.575-2.557Zm-4.49 4.22c-1.087.062-2.217-.427-2.272-1.472-.042-.775.551-1.64 2.34-1.743.204-.012.405-.018.603-.018a8.48 8.48 0 0 1 1.809.184c-.206 2.573-1.415 2.99-2.48 3.05Z"
                        />
                      </svg>
                    </span>
                    <span className="sr-only">Threads</span>
                  </a>
                </li>
                <li className="mb-2 ml-2 inline-block">
                  <a
                    className="hover:text-scheme-accent fill-current"
                    href="https://wa.me/message/IDYO6Q7POL2LH1"
                    target="_blank"
                  >
                    <span className="inline-block h-8 w-8" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon fill-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                      >
                        <path
                          fill="currentColor"
                          d="m2.047 22 1.406-5.136a9.89 9.89 0 0 1-1.322-4.955C2.133 6.446 6.579 2 12.04 2a9.839 9.839 0 0 1 7.011 2.907 9.854 9.854 0 0 1 2.9 7.011c-.002 5.465-4.448 9.91-9.91 9.91a9.916 9.916 0 0 1-4.74-1.206L2.047 22Zm5.498-3.172c1.397.829 2.73 1.325 4.493 1.326 4.54 0 8.239-3.695 8.241-8.237a8.235 8.235 0 0 0-8.234-8.244c-4.543 0-8.24 3.695-8.24 8.237-.002 1.854.542 3.242 1.454 4.695l-.832 3.04 3.118-.817Zm9.49-4.554c-.063-.103-.227-.165-.476-.289-.247-.124-1.465-.723-1.692-.806-.227-.082-.392-.124-.558.124-.165.248-.64.806-.784.971-.144.165-.29.186-.537.062-.247-.124-1.045-.385-1.991-1.23-.736-.656-1.234-1.467-1.378-1.715-.144-.248-.015-.382.108-.505.112-.111.248-.29.372-.434.126-.144.167-.247.25-.413.083-.165.042-.31-.02-.434-.063-.123-.558-1.343-.764-1.838-.202-.483-.406-.418-.558-.425l-.475-.009a.907.907 0 0 0-.66.31c-.226.249-.866.847-.866 2.066 0 1.22.887 2.397 1.01 2.562.125.165 1.746 2.666 4.23 3.739a14.6 14.6 0 0 0 1.412.522c.594.188 1.134.161 1.56.098.476-.07 1.465-.6 1.672-1.177.207-.58.207-1.075.144-1.179Z"
                        />
                      </svg>
                    </span>
                    <span className="sr-only">Whatsapp</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-2 block text-left">
            <div className="rte">
              <p>
                <strong>
                  STORE
                  <br />
                </strong>
                <a
                  href="https://maps.app.goo.gl/SnbxhBqMgjqD9iyo6"
                  target="_blank"
                  title="https://maps.app.goo.gl/SnbxhBqMgjqD9iyo6"
                >
                  <strong>214 HAI BA TRUNG, D.1, HCMC, VIETNAM</strong>
                </a>
              </p>
            </div>
          </div>
          <div className="mt-4 block text-left">
            <div className="rte" />
          </div>
        </div>

        <div className="bg-primary text-background p-5 font-bold">
          <div className="rte">
            <p>
              <a href="#" title="Contact">
                CONTACT US
              </a>
              <br />
              MON-SUN 8:30AM - 9:30PM
            </p>
            <p>
              HOTLINE{" "}
              <a href="tel:+84977699624" title="tel:+84977699624">
                +84 977 699 624
                <br />
              </a>
              WHATSAPP{" "}
              <a
                href="https://wa.me/message/IDYO6Q7POL2LH1"
                title="https://wa.me/message/IDYO6Q7POL2LH1"
              >
                +84 36 763 0510
              </a>
            </p>
            <p>
              EMAIL{" "}
              <a
                href="#"
                title="mailto:stressmamastreetwear@gmail.com"
                className="break-words"
              >
                STRESSMAMASTREETWEAR@GMAIL.COM
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-background text-primary flex items-center justify-center p-5 font-bold">
        Copyright © 2025, STRESSMAMA.
      </div>
    </>
  );
}
