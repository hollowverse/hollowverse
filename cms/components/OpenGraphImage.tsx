import React, { useEffect } from 'react';
import { FormField } from '@sanity/base/components';
import { TextInput, Flex, Button, Box, Text } from '@sanity/ui';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';
import { nextApiClient } from '../shared/lib/nextApiClient';
import { isUrl } from '../shared/isUrl';

async function getOgImageUrl(source: string) {
  const response = await nextApiClient(
    `scrape-open-graph?url=${encodeURI(source)}`,
  );

  return response?.result?.ogImage?.url;
}

export const OpenGraphImage = React.forwardRef(function OpenGraphImage(
  props: any,
  ref,
) {
  function onChange(imageUrl: string) {
    props.onChange(PatchEvent.from(imageUrl ? set(imageUrl) : unset()));
  }

  const handleChange = React.useCallback((event) => {
    onChange(event.currentTarget.value);
  }, []);

  const valueIsSet = props.value && isUrl(props.value);

  const handleGet = React.useCallback(async () => {
    if (valueIsSet) {
      onChange('');
      return;
    }

    onChange(await getOgImageUrl(props.parent.source));
  }, [onChange, props.value]);

  return (
    <>
      <FormField
        title="Open Graph Image"
        description="Click 'Get' to retrieve the Open Graph image"
        id="open-graph-image"
        __unstable_markers={props.markers}
      >
        <Flex>
          <Box flex={1}>
            <TextInput
              id="open-graph-image"
              onChange={handleChange}
              value={props.value || ''} // Current field value
              ref={ref as any}
            />
          </Box>

          <Box marginLeft={2}>
            <Button
              onClick={handleGet}
              mode="ghost"
              text={valueIsSet ? 'Remove' : 'Get'}
            />
          </Box>
        </Flex>
        {valueIsSet && (
          <Flex gap={2} direction="column" marginTop={3}>
            <Text size={1}>Preview</Text>
            <img
              src={props.value}
              style={{ maxHeight: 300, borderRadius: 5, objectFit: 'cover' }}
            />
          </Flex>
        )}
      </FormField>
    </>
  );
});
