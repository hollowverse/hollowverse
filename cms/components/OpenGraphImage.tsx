import React from 'react';
import { FormField } from '@sanity/base/components';
import { TextInput, Flex, Button, Box } from '@sanity/ui';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';

export const OpenGraphImage = React.forwardRef(function OpenGraphImage(
  props: any,
  ref,
) {
  const {
    type, // Schema information
    value, // Current field value
    readOnly, // Boolean if field is not editable
    placeholder, // Placeholder text from the schema
    markers, // Markers including validation rules
    presence, // Presence information for collaborative avatars
    onFocus, // Method to handle focus state
    onBlur, // Method to handle blur state,
    onChange,
  } = props;

  const handleChange = React.useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value; // get current value
      // if the value exists, set the data, if not, unset the data
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
    },
    [onChange],
  );

  console.log('props', props);

  const handleGet = React.useCallback(
    (event) => {
      const source = props.parent.source;
      // const inputValue = event.currentTarget.value; // get current value
      // if the value exists, set the data, if not, unset the data
      onChange(PatchEvent.from(source ? set(source) : unset()));
    },
    [onChange],
  );

  return (
    <FormField
      description={type.description} // Creates description from schema
      title={type.title} // Creates label from schema title
      __unstable_markers={markers} // Handles all markers including validation
      __unstable_presence={presence} // Handles presence avatars
      id="open-graph-image"
    >
      <Flex>
        <Box flex={1}>
          <TextInput
            id="open-graph-image"
            onChange={handleChange}
            value={value || ''} // Current field value
            readOnly={readOnly} // If "readOnly" is defined make this field read only
            placeholder={placeholder} // If placeholder is defined, display placeholder text
            onFocus={onFocus} // Handles focus events
            onBlur={onBlur} // Handles blur events
            ref={ref as any}
          />
        </Box>

        <Button onClick={handleGet} mode="ghost" text="Get" />
      </Flex>
    </FormField>
  );
});
