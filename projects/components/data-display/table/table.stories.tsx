import type { Meta, StoryObj } from '@storybook/react';

// Import components
import { Table } from './index';

// import mocks
import people from '@mocks/people';

const meta: Meta<typeof Table> = {
  component: Table,
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell th>Name</Table.Cell>
            <Table.Cell th>Age</Table.Cell>
            <Table.Cell th>Occupation</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {people.map((person) => {
            return (
              <Table.Row key={`row-${person.name}`}>
                <Table.Cell contextHeading="name" key={person.name}>
                  {person.name}
                </Table.Cell>
                <Table.Cell contextHeading="age" key={person.age}>
                  {person.age}
                </Table.Cell>
                <Table.Cell contextHeading="occupation" key={person.occupation}>
                  {person.occupation}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </>
    )
  },
  parameters: {
    previewLayout: 'vertical'
    // worksWith: 'TableFactory'
  }
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {};

export const Striped: Story = {
  args: {
    striped: true
  }
};
