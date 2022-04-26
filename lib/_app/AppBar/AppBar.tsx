import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {useRouter} from 'next/router';


export const AppBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter()

  // dynamic classNames
  let topbar_class = ['px-4', 'container', 'mx-auto', 'flex', router.pathname == '/' ? 'flex-col' : 'flex-row', 'gap-4', 'items-center', 'justify-center', 'w-full', 'h-auto'].join(' ')
  let navbar_class = [router.pathname == '/' ? 'py-10' : 'py-4'].join(' ')
  
  let logo_container_class = ['w-full', 'h-auto', showSearch ? 'hidden' : 'block', 'md:block'].join(' ')
  let logo_class = ['flex', 'flex-col', router.pathname == '/' ? 'items-center' : 'items-start', 'justify-center'].join(' ');
  
  let search_container_class = ['flex', 'w-full', 'md:w-auto', 'items-center', router.pathname == '/' ? 'justify-center' : 'justify-end', 'gap-4'].join(' ')
  let search_class = [showSearch ? 'flex' : router.pathname == '/' ? 'flex' : 'hidden', 'md:flex', 'items-center', 'justify-between', 'rounded-md', 'pl-2', 'border', 'border-lg-1', 'w-full', 'md:w-400', 'h-auto'].join(' ')
  let search_button = [showSearch ? 'hidden' : router.pathname == '/' ? 'hidden' : 'flex', 'items-center', 'justify-center', 'md:hidden', 'hover:bg-slate-100', 'active:bgd-slate-200', 'transition-colors', 'rounded-full', 'h-10', 'w-10'].join(' ')
  let close_button = [showSearch ? router.pathname == '/' : 'hidden' ? 'hidden' : 'flex', 'items-center', 'justify-center', 'md:hidden', 'hover:bg-slate-100', 'active:bgd-slate-200', 'transition-colors', 'rounded-full', 'h-10', 'w-10'].join(' ')

  return (
    <nav className={navbar_class}>
      <section className={topbar_class}>
        <div className={logo_container_class}>
          <Link passHref href="/">
              <a className={logo_class}>
                <div className="hidden md:block">
                  <Image
                    src="/images/logo.svg"
                    width={250}
                    height={30}
                    alt="Hollowverse"
                    layout="fixed"
                  />
                </div>

                <div className="block md:hidden">
                  <Image
                    src="/images/logo.svg"
                    width={190}
                    height={30}
                    alt="Hollowverse"
                    layout="fixed"
                  />
                </div>
                <p className="font-primary mt-2 text-sm font-medium" style={{display: router.pathname == '/' ? 'block' : 'none'}}>
                  Important people and facts
                </p>
              </a>
          </Link>
        </div>

        <div className={search_container_class}>
          <div className={search_class}>
            <Image layout="intrinsic" width={35} height={35} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJESURBVHgB7Ze/UuMwEMY3uSbpku46dN2VXHdl6OhwSwV0dCFPwPAG8ASYkgooqYCOMnkCxAuE0LmK+b6JPIhMsLzCzADj38yOJFt/Pq+s9VqkoaHhe9CSSHq9nkEx8C5Z2HgGpCZU4iCo1263h3meH7C5csJWK53P50fQaOWDVBYHXQMsfIqqqdIffY+n0+lIPkAlcRA25GJFG567RXEFY8ltpBcNLEG/HW/oGH036tzqZWFJv9/PnT2hfRDob9DvwRtzI5G0QgvBE5zcsA0v/IMTxhKA76Ybt+7GjTDuWJS0A/cTT9ioijDCbeR2ymLL+f4dUrAoKRWHSYeuarVP7gQeuSaFrYuSd8XhQTmZYR2LnEgcqTjvgR1RUuY549Urbecy7pRa1rEL9XlO3gbZB4kEXp+smK8SoQNRB2uuVMe6MnHWq29IJNhOwxIefBQlZeL4nhWhYEsi8A+VLL4mKt4V50JBcRASl4XoJkeS4DUvRUnonSviFL13oQmk/B7j4XZZR5nGZCm/ym5mWWY7nU4fwv6j+RvlJtrXuD4LCfMSBQvbC41RiyMQc09RFOcEJrj2DLNYMFsSNeh2u6fos+9fho3RdSJKqqZMXICLJku3buU1RAzkbSyb+W1uMbb2TBQEPUeyBefw1qOL9MWiBvbXWccTkqLYhk2KB3IetxoPRv1DMMeTRcay5sUxnuw7WOonl+i76zLoQrjag58KBXrJZ452pSQg+u9LywoP/qnjJ6g2Cg+ylK9IzJemoaGh4afyAiUa6dqFQOIGAAAAAElFTkSuQmCC" alt="Search icon" />
            <input placeholder="Search by tag, issue or name" className="ml-2 bg-transparent border-0 search-bar font-medium w-full h-auto p-3 px-4 pl-0 outline-none" type="text" />
          </div>
          
          {/* mobile search button */}
          <button onClick={() => {setShowSearch(!showSearch)}} className={search_button}>
            <Image layout="intrinsic" width={36} height={36} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJESURBVHgB7Ze/UuMwEMY3uSbpku46dN2VXHdl6OhwSwV0dCFPwPAG8ASYkgooqYCOMnkCxAuE0LmK+b6JPIhMsLzCzADj38yOJFt/Pq+s9VqkoaHhe9CSSHq9nkEx8C5Z2HgGpCZU4iCo1263h3meH7C5csJWK53P50fQaOWDVBYHXQMsfIqqqdIffY+n0+lIPkAlcRA25GJFG567RXEFY8ltpBcNLEG/HW/oGH036tzqZWFJv9/PnT2hfRDob9DvwRtzI5G0QgvBE5zcsA0v/IMTxhKA76Ybt+7GjTDuWJS0A/cTT9ioijDCbeR2ymLL+f4dUrAoKRWHSYeuarVP7gQeuSaFrYuSd8XhQTmZYR2LnEgcqTjvgR1RUuY549Urbecy7pRa1rEL9XlO3gbZB4kEXp+smK8SoQNRB2uuVMe6MnHWq29IJNhOwxIefBQlZeL4nhWhYEsi8A+VLL4mKt4V50JBcRASl4XoJkeS4DUvRUnonSviFL13oQmk/B7j4XZZR5nGZCm/ym5mWWY7nU4fwv6j+RvlJtrXuD4LCfMSBQvbC41RiyMQc09RFOcEJrj2DLNYMFsSNeh2u6fos+9fho3RdSJKqqZMXICLJku3buU1RAzkbSyb+W1uMbb2TBQEPUeyBefw1qOL9MWiBvbXWccTkqLYhk2KB3IetxoPRv1DMMeTRcay5sUxnuw7WOonl+i76zLoQrjag58KBXrJZ452pSQg+u9LywoP/qnjJ6g2Cg+ylK9IzJemoaGh4afyAiUa6dqFQOIGAAAAAElFTkSuQmCC" alt="Search icon" />
          </button>

          <button onClick={() => {setShowSearch(!showSearch)}} className={close_button}>
            <Image layout="intrinsic" width={16} height={18} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABFAAAARQB+zng/wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEJSURBVFiFvdXBCoJAEIDhn96ro2+RtyKlToGXXrSDB6ECoUNBncsO7ULIrrq7Mw54kfD7E3UAlsAJOAMr9CcHLsZcAtRAZ44PUCripTGsVwPc/k5oRvTxzthseyc1Ilx4Z2wADp6IvQC+Ad6O6x/7P9SImIxrRATjkhHRuEREMp4SIYbHRIjjIRFq+JQIddxO5YlwfeEqadyO606o//OQiGB8ERHw4nfb+9MBz4jrBY3vgZNeYM4pcD9wrohCGh961TRX+ShuRy0i5CMjHrEOwMcidnPgYhEpeHKEBB4dIYkHR2jgkyNy9Feqb5XnAK0yPhTRAjQz4L6IBiADrsAdhSXimAJ4GDP7Ao3GS7lBEjtAAAAAAElFTkSuQmCC" alt="Close icon" />
          </button>
        </div>
      </section>
    </nav>
  );
};
