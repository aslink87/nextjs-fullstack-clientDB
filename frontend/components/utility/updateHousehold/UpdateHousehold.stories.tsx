import { ComponentStory, ComponentMeta } from '@storybook/react';
import UpdateHousehold, { IUpdateHousehold } from './UpdateHousehold';
import { mockUpdateHouseholdProps } from './UpdateHousehold.mocks';

export default {
  title: 'utility/UpdateHousehold',
  component: UpdateHousehold,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof UpdateHousehold>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UpdateHousehold> = (args) => (
  <UpdateHousehold {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockUpdateHouseholdProps.base,
} as IUpdateHousehold;
