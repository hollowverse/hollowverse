import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export const AppBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const isHomepage = router.pathname == '/';

  return (
    <nav className={clsx(isHomepage ? 'py-10 h-auto' : 'py-0 h-16')}>
      <section
        className={clsx(
          'px-4 container mx-auto flex gap-4 items-center justify-center w-full h-full',
          isHomepage ? 'flex-col' : 'flex-row',
        )}
      >
        <div
          className={clsx(
            'w-full md:block',
            showSearch ? (isHomepage ? 'block' : 'hidden') : 'block',
          )}
        >
          <Link passHref href="/">
            <a
              className={clsx(
                'flex flex-col justify-center',
                isHomepage ? 'items-center' : 'items-start',
              )}
            >
              <Image
                src="/images/logo.svg"
                width={250}
                height={30}
                alt="Hollowverse"
                layout="fixed"
              />

              {isHomepage && (
                <p className="font-primary mt-2 text-sm font-medium">
                  Important people and facts
                </p>
              )}
            </a>
          </Link>
        </div>

        <div
          className={clsx(
            'flex w-full items-center gap-4',
            isHomepage ? 'justify-center' : 'justify-end',
          )}
        >
          {/* Search input */}
          <div
            className={clsx(
              isHomepage ? 'flex' : showSearch ? 'flex' : 'hidden',
              'flex-row items-center justify-between rounded-md pl-2 border border-lg-1 w-400',
            )}
          >
            {isHomepage && (
              <Image
                layout="intrinsic"
                width={35}
                height={35}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJESURBVHgB7Ze/UuMwEMY3uSbpku46dN2VXHdl6OhwSwV0dCFPwPAG8ASYkgooqYCOMnkCxAuE0LmK+b6JPIhMsLzCzADj38yOJFt/Pq+s9VqkoaHhe9CSSHq9nkEx8C5Z2HgGpCZU4iCo1263h3meH7C5csJWK53P50fQaOWDVBYHXQMsfIqqqdIffY+n0+lIPkAlcRA25GJFG567RXEFY8ltpBcNLEG/HW/oGH036tzqZWFJv9/PnT2hfRDob9DvwRtzI5G0QgvBE5zcsA0v/IMTxhKA76Ybt+7GjTDuWJS0A/cTT9ioijDCbeR2ymLL+f4dUrAoKRWHSYeuarVP7gQeuSaFrYuSd8XhQTmZYR2LnEgcqTjvgR1RUuY549Urbecy7pRa1rEL9XlO3gbZB4kEXp+smK8SoQNRB2uuVMe6MnHWq29IJNhOwxIefBQlZeL4nhWhYEsi8A+VLL4mKt4V50JBcRASl4XoJkeS4DUvRUnonSviFL13oQmk/B7j4XZZR5nGZCm/ym5mWWY7nU4fwv6j+RvlJtrXuD4LCfMSBQvbC41RiyMQc09RFOcEJrj2DLNYMFsSNeh2u6fos+9fho3RdSJKqqZMXICLJku3buU1RAzkbSyb+W1uMbb2TBQEPUeyBefw1qOL9MWiBvbXWccTkqLYhk2KB3IetxoPRv1DMMeTRcay5sUxnuw7WOonl+i76zLoQrjag58KBXrJZ452pSQg+u9LywoP/qnjJ6g2Cg+ylK9IzJemoaGh4afyAiUa6dqFQOIGAAAAAElFTkSuQmCC"
                alt="Search icon"
              />
            )}
            <input
              placeholder="Search by tag, issue or name"
              className="ml-2 bg-transparent border-0 search-bar font-medium w-full h-auto p-3 px-4 pl-0 outline-none"
              type="search"
            />
          </div>

          {/* mobile search button */}
          {!isHomepage && !showSearch && (
            <button
              onClick={() => {
                setShowSearch(!showSearch);
              }}
              className="flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 transition-colors rounded-full h-10 w-10"
            >
              <Image
                layout="intrinsic"
                width={36}
                height={36}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJESURBVHgB7Ze/UuMwEMY3uSbpku46dN2VXHdl6OhwSwV0dCFPwPAG8ASYkgooqYCOMnkCxAuE0LmK+b6JPIhMsLzCzADj38yOJFt/Pq+s9VqkoaHhe9CSSHq9nkEx8C5Z2HgGpCZU4iCo1263h3meH7C5csJWK53P50fQaOWDVBYHXQMsfIqqqdIffY+n0+lIPkAlcRA25GJFG567RXEFY8ltpBcNLEG/HW/oGH036tzqZWFJv9/PnT2hfRDob9DvwRtzI5G0QgvBE5zcsA0v/IMTxhKA76Ybt+7GjTDuWJS0A/cTT9ioijDCbeR2ymLL+f4dUrAoKRWHSYeuarVP7gQeuSaFrYuSd8XhQTmZYR2LnEgcqTjvgR1RUuY549Urbecy7pRa1rEL9XlO3gbZB4kEXp+smK8SoQNRB2uuVMe6MnHWq29IJNhOwxIefBQlZeL4nhWhYEsi8A+VLL4mKt4V50JBcRASl4XoJkeS4DUvRUnonSviFL13oQmk/B7j4XZZR5nGZCm/ym5mWWY7nU4fwv6j+RvlJtrXuD4LCfMSBQvbC41RiyMQc09RFOcEJrj2DLNYMFsSNeh2u6fos+9fho3RdSJKqqZMXICLJku3buU1RAzkbSyb+W1uMbb2TBQEPUeyBefw1qOL9MWiBvbXWccTkqLYhk2KB3IetxoPRv1DMMeTRcay5sUxnuw7WOonl+i76zLoQrjag58KBXrJZ452pSQg+u9LywoP/qnjJ6g2Cg+ylK9IzJemoaGh4afyAiUa6dqFQOIGAAAAAElFTkSuQmCC"
                alt="Search icon"
              />
            </button>
          )}

          {/* search bar close button */}
          {!isHomepage && showSearch && (
            <button
              onClick={() => {
                setShowSearch(!showSearch);
              }}
              className="items-center justify-center hover:bg-slate-100 active:bgd-slate-200 transition-colors rounded-full h-10 w-10 flex"
            >
              <Image
                layout="intrinsic"
                width={16}
                height={16}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABFAAAARQB+zng/wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEJSURBVFiFvdXBCoJAEIDhn96ro2+RtyKlToGXXrSDB6ECoUNBncsO7ULIrrq7Mw54kfD7E3UAlsAJOAMr9CcHLsZcAtRAZ44PUCripTGsVwPc/k5oRvTxzthseyc1Ilx4Z2wADp6IvQC+Ad6O6x/7P9SImIxrRATjkhHRuEREMp4SIYbHRIjjIRFq+JQIddxO5YlwfeEqadyO606o//OQiGB8ERHw4nfb+9MBz4jrBY3vgZNeYM4pcD9wrohCGh961TRX+ShuRy0i5CMjHrEOwMcidnPgYhEpeHKEBB4dIYkHR2jgkyNy9Feqb5XnAK0yPhTRAjQz4L6IBiADrsAdhSXimAJ4GDP7Ao3GS7lBEjtAAAAAAElFTkSuQmCC"
                alt="Close icon"
              />
            </button>
          )}
        </div>
      </section>
    </nav>
  );
};
