import { useEffect, useState } from 'react';
import {
  FaRegChartBar,
  FaRegCommentAlt,
  FaRegShareSquare,
} from 'react-icons/fa';
import { FacebookComments } from '~/components/FacebookComments';
import { FacebookCommentsCount } from '~/components/FacebookCommentsCount';
import { useShareButton } from '~/components/ShareButton';
import { VoteButtons } from '~/components/VoteButtons';
import { c } from '~/lib/c';
import { factViewCountResultsProvider } from '~/lib/FactViewCountResultsProvider';
import { getFactPagePathname } from '~/lib/getFactPagePathname';
import { getFactPageTitle } from '~/lib/getFactPageTitle';
import { Fact } from '~/lib/groq/fact.projection';
import { ReactElementProps } from '~/shared/lib/types';

export function FactFooter(props: {
  fact: Fact;
  showCommentsButton?: boolean;
  celebName: string;
  slug: string;
}) {
  const { getClickHandler, copied } = useShareButton();
  const [viewCount, setViewCount] = useState('Views');
  const showCommentsButton = props.showCommentsButton ?? true;
  const [showComments, setShowComments] = useState(false);
  const [showViewCountText, setShowViewCountText] = useState(true);

  useEffect(() => {
    async function req() {
      const viewCountRes = await factViewCountResultsProvider.get(
        props.fact._id,
      );

      if (viewCountRes) {
        setViewCount(viewCountRes);
      }
    }

    req();
  }, [props.fact._id]);

  return (
    <div className="flex flex-col gap-5">
      <div className="FACT-FOOTER -mx-5 flex content-between justify-between border-t px-5 pt-5 text-neutral-600">
        <VoteButtons fact={props.fact} />

        {showCommentsButton && (
          <FooterButton
            onClick={() => setShowComments(true)}
            id="fact-comments-link"
          >
            <FaRegCommentAlt className="text-xl" />

            <div className="font-semibold">
              <FacebookCommentsCount fact={props.fact} slug={props.slug} />
            </div>
          </FooterButton>
        )}

        <FooterButton onClick={() => setShowViewCountText(!showViewCountText)}>
          <FaRegChartBar className="text-xl" />
          <p className="font-semibold">
            {showViewCountText ? viewCount : 'Views'}
          </p>
        </FooterButton>

        <FooterButton
          onClick={getClickHandler({
            text: getFactPageTitle(props.celebName, props.fact, 200),
            url: `https://hollowverse.com${getFactPagePathname(
              props.slug,
              props.fact,
            )}`,
          })}
        >
          <FaRegShareSquare className="text-xl" />
          <p className="font-semibold">
            {copied ? <span className="text-sm">URL copied</span> : 'Share'}
          </p>
        </FooterButton>
      </div>

      {showComments ? (
        <div className="-mx-5 -mb-5">
          <hr />
          <div className="mx-3 my-1">
            <FacebookComments
              pathname={getFactPagePathname(props.slug, props.fact)}
              limit={5}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function FooterButton(props: ReactElementProps<'button'>) {
  return (
    <button
      {...props}
      className={c(
        'flex min-w-[50px] flex-col items-center gap-0.5',
        props.className,
      )}
    />
  );
}
