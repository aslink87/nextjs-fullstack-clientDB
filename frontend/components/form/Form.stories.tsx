import { ComponentStory, ComponentMeta } from '@storybook/react';
import Form, { IForm } from './Form';
import { mockFormProps } from './Form.mocks';

export default {
  title: 'components/Form',
  component: Form,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Form>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Form> = (args) => (
  <Form {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFormProps.base,
} as IForm;
