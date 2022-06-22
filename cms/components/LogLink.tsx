import { FormField } from '@sanity/base/components';
import { Button, Flex } from '@sanity/ui';
import React from 'react';

export const LogLink = React.forwardRef(function OpenGraphImage(props: any) {
  const logLevels = '(level_string=info OR level_string=error)';
  const highLogLevels =
    '(level_string=info OR level_string=error OR level_string=debug)';

  const [link, highLevelLink] = [logLevels, highLogLevels].map(
    (l) =>
      `https://logtail.com/team/58257/tail?s=140937&q=${encodeURIComponent(
        [
          l,
          'AND',
          `m.requestName="${props.parent._id};${props.parent._rev}"`,
        ].join(' '),
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
