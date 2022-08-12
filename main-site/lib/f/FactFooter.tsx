import { useEffect, useState } from 'react';
import {
  FaRegChartBar,
  FaRegCommentAlt,
  FaRegShareSquare,
} from 'react-icons/fa';
import { FacebookComments } from '~/lib/f/FacebookComments';
import { FacebookCommentsCount } from '~/lib/f/FacebookCommentsCount';
import { useShareButton } from '~/lib/s/ShareButton';
import { VoteButtons } from '~/lib/v/VoteButtons';
import { c } from '~/lib/c/c';
import { factViewCountProvider } from '~/lib/f/FactViewCounProvider';
import { getFactPagePathname } from '~/lib/g/getFactPagePathname';
import { getFactPageTitle } from '~/lib/g/getFactPageTitle';
import { Fact } from '~/lib/f/fact.projection';
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
      const viewCountRes = await factViewCountProvider.get(props.fact._id);

      if (viewCountRes) {
        setViewCount(viewCountRes);
      }
    }

    req();
  }, [props.fact._id]);

  return (
    <div className="-mx-5 flex flex-col border-t px-5">
      <div className="FACT-FOOTER flex content-between justify-between py-3 text-neutral-500">
        <VoteButtons fact={props.fact} />

        {showCommentsButton && (
          <FooterButton
            onClick={() => setShowComments(true)}
            id="fact-comments-link"
          >
            <FaRegCommentAlt className="text-lg" />

            <div className="font-semibold">
              <FacebookCommentsCount fact={props.fact} slug={props.slug} />
            </div>
          </FooterButton>
        )}

        <FooterButton
          onClick={getClickHandler({
            text: getFactPageTitle(props.celebName, props.fact, 200),
            url: `https://hollowverse.com${getFactPagePathname(
              props.slug,
              props.fact,
            )}`,
          })}
        >
          <FaRegShareSquare className="text-lg" />
          <p className="font-semibold">
            {copied ? <span className="text-sm">URL copied</span> : 'Share'}
          </p>
        </FooterButton>

        <FooterButton onClick={() => setShowViewCountText(!showViewCountText)}>
          <FaRegChartBar className="text-lg" />
          <p className="font-semibold">
            {showViewCountText ? viewCount : 'Views'}
          </p>
        </FooterButton>
      </div>

      {showComments ? (
        <div className="-mx-5 border-t px-2">
          <FacebookComments
            pathname={getFactPagePathname(props.slug, props.fact)}
            limit={5}
          />
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
        'flex min-w-[50px] flex-col items-center gap-0.5 py-1 text-xs',
        props.className,
      )}
    />
  );
}
