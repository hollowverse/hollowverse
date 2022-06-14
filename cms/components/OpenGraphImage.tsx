import { FormField } from '@sanity/base/components';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';
import { Box, Button, Flex, Text, TextInput } from '@sanity/ui';
import React, { useState } from 'react';
import { isUrl } from '../shared/isUrl';
import { nextApiClient } from '../shared/lib/nextApiClient';

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
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    onChange(await getOgImageUrl(props.parent.source));
    setLoading(false);
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
              value={props.value || ''}
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
        {loading && <Text size={1}>Loading...</Text>}
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
