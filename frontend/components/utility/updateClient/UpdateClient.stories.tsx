import { ComponentStory, ComponentMeta } from '@storybook/react';
import UpdateClient, { IUpdateClient } from './UpdateClient';
import { mockUpdateClientProps } from './UpdateClient.mocks';

export default {
  title: 'utility/UpdateClient',
  component: UpdateClient,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof UpdateClient>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UpdateClient> = (args) => (
  <UpdateClient {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockUpdateClientProps.base,
} as IUpdateClient;
