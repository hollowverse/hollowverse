import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import { TitledCard } from '~/lib/TitledCard.ui';

export function WriteWikiCta(props: { celeb: { name: string } }) {
  return (
    <TitledCard titledContentProps={{ title: 'Wiki' }}>
      <div className="p-5">
        <p>
          Be the first to write a short wiki about {props.celeb.name}'s religion
          and political views.
        </p>

        <div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button
              href={getWikiContribLink()}
              startIcon={<EditIcon />}
              size="small"
              variant="contained"
              className="w-fit bg-blue-500"
            >
              Write a short wiki
            </Button>

            <Button
              href="https://forum.hollowverse.com/t/-/7333#write-a-new-wiki-6"
              startIcon={<InfoIcon />}
              size="small"
              className="w-fit"
            >
              How to write a wiki
            </Button>
          </div>
        </div>
      </div>
    </TitledCard>
  );

  function getWikiContribLink() {
    const title = `${props.celeb.name}'s wiki`;
    const encodedTitle = encodeURIComponent(title);
    const href = `https://forum.hollowverse.com/new-topic?title=${encodedTitle}&category=wiki`;

    return href;
  }
}
