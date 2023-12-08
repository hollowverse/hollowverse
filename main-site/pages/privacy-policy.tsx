import ContentWithSiderailContainer from '~/lib/ContentWithSiderailContainer';
import { Link } from '~/lib/Link';
import { Page } from '~/lib/Page';
import { useSearch } from '~/lib/useSearch';

export default function Search() {
  const hook = useSearch();

  return (
    <Page
      title={`Hollowverse Privacy Policy`}
      description={`Hollowverse Privacy Policy`}
      pathname={`/privacy-policy`}
      allowSearchEngines
      id="privacy policy"
    >
      <ContentWithSiderailContainer className="h-container">
        <div className="h-container mb-5 flex min-h-full flex-1 flex-col items-stretch text-neutral-600">
          <div className="flex-1">
            <h1 className="mb-3 text-3xl font-bold">Privacy Policy</h1>
            <p className="text-lg">
              Your privacy is important to us. It is Hollowverse's policy to
              respect your privacy regarding any information we may collect from
              you across our website,{' '}
              <Link href="/" passHref>
                <a className="text-blue-600">https://hollowverse.com</a>
              </Link>
              , and other sites we own and operate.
            </p>
            <p className="text-lg">
              We only ask for personal information when we truly need it to
              provide a service to you. We collect it by fair and lawful means,
              with your knowledge and consent. We also let you know why we’re
              collecting it and how it will be used.
            </p>
            <p className="text-lg">
              We only retain collected information for as long as necessary to
              provide you with your requested service. What data we store, we’ll
              protect within commercially acceptable means to prevent loss and
              theft, as well as unauthorised access, disclosure, copying, use or
              modification.
            </p>
            <p className="text-lg">
              We don’t share any personally identifying information publicly or
              with third-parties, except when required to by law.
            </p>
            <p className="text-lg">
              Our website may link to external sites that are not operated by
              us. Please be aware that we have no control over the content and
              practices of these sites, and cannot accept responsibility or
              liability for their respective privacy policies.
            </p>
            <p className="text-lg">
              You are free to refuse our request for your personal information,
              with the understanding that we may be unable to provide you with
              some of your desired services.
            </p>
            <p className="text-lg">
              Your continued use of our website will be regarded as acceptance
              of our practices around privacy and personal information. If you
              have any questions about how we handle user data and personal
              information, feel free to contact us.
            </p>
            <p className="text-lg">
              This policy is effective as of 1 January 2021.
            </p>
          </div>
        </div>
      </ContentWithSiderailContainer>
    </Page>
  );
}
