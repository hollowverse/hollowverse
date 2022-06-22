import { FormField } from '@sanity/base/components';
import { Button, Flex } from '@sanity/ui';
import React from 'react';

export const LogLink = React.forwardRef(function OpenGraphImage(props: any) {
  const logLevels = 'm.level:~"info|error"';
  const highLogLevels = ''; // all;

  const [link, highLevelLink] = [logLevels, highLogLevels].map(
    (l) =>
      `https://logflare.app/sources/20962/search?querystring=${encodeURIComponent(
        [l, `m.requestName:"${props.parent._id};${props.parent._rev}"`]
          .join(' ')
          .trim(),
      )}`,
  );

  return (
    <>
      <FormField
        title=""
        description=""
        id="system-logs"
        __unstable_markers={props.markers}
      >
        <Flex gap={2}>
          <Button mode="bleed">
            <a href={link} target="_blank">
              Open system logs
            </a>
          </Button>

          <Button mode="bleed">
            <a href={highLevelLink} target="_blank">
              Open system logs (with debug info)
            </a>
          </Button>
        </Flex>
      </FormField>
    </>
  );
});
