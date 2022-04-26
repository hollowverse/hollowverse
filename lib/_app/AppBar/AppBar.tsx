import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
export const AppBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="py-10">
      <section className="px-4 container mx-auto flex flex-col gap-4 items-center justify-center w-full h-auto">
        <div className="w-full h-auto block">

          <div style={{ display: showSearch ? 'none' : 'block' }}>
            <Link passHref href="/">
              <a className="flex flex-col items-center justify-center">
                <Image
                  src="/images/logo.svg"
                  width={250}
                  height={30}
                  alt="Hollowverse"
                />
                <p className="font-primary mt-2 text-sm font-medium">
                  Important people and facts
                </p>
              </a>
            </Link>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center rounded-md pl-2 border border-lg w-full md:w-400 h-auto">
            <Image layout="intrinsic" width={35} height={35} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJESURBVHgB7Ze/UuMwEMY3uSbpku46dN2VXHdl6OhwSwV0dCFPwPAG8ASYkgooqYCOMnkCxAuE0LmK+b6JPIhMsLzCzADj38yOJFt/Pq+s9VqkoaHhe9CSSHq9nkEx8C5Z2HgGpCZU4iCo1263h3meH7C5csJWK53P50fQaOWDVBYHXQMsfIqqqdIffY+n0+lIPkAlcRA25GJFG567RXEFY8ltpBcNLEG/HW/oGH036tzqZWFJv9/PnT2hfRDob9DvwRtzI5G0QgvBE5zcsA0v/IMTxhKA76Ybt+7GjTDuWJS0A/cTT9ioijDCbeR2ymLL+f4dUrAoKRWHSYeuarVP7gQeuSaFrYuSd8XhQTmZYR2LnEgcqTjvgR1RUuY549Urbecy7pRa1rEL9XlO3gbZB4kEXp+smK8SoQNRB2uuVMe6MnHWq29IJNhOwxIefBQlZeL4nhWhYEsi8A+VLL4mKt4V50JBcRASl4XoJkeS4DUvRUnonSviFL13oQmk/B7j4XZZR5nGZCm/ym5mWWY7nU4fwv6j+RvlJtrXuD4LCfMSBQvbC41RiyMQc09RFOcEJrj2DLNYMFsSNeh2u6fos+9fho3RdSJKqqZMXICLJku3buU1RAzkbSyb+W1uMbb2TBQEPUeyBefw1qOL9MWiBvbXWccTkqLYhk2KB3IetxoPRv1DMMeTRcay5sUxnuw7WOonl+i76zLoQrjag58KBXrJZ452pSQg+u9LywoP/qnjJ6g2Cg+ylK9IzJemoaGh4afyAiUa6dqFQOIGAAAAAElFTkSuQmCC" alt="Search icon" />
            <input placeholder="Search by tag, issue or name" className="ml-2 bg-transparent border-0 search-bar font-medium w-full h-auto p-3 px-4 pl-0 outline-none" type="text" />
          </div>
        </div>
      </section>
    </nav>
  );
};
