import { Tabs as TabsMantine } from '@mantine/core';

interface Tab {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  content: React.ReactNode;
}

interface Panel {
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  panels: Panel[];
}

export const Tabs = ({ tabs, panels }: TabsProps) => {
  return (
    <TabsMantine defaultValue={tabs[0].value}>
      <TabsMantine.List>
        {tabs.map((tab) => (
          <TabsMantine.Tab
            key={tab.value}
            value={tab.value}
            leftSection={tab?.icon}
            disabled={tab.disabled ?? false}
          >
            {tab.label}
          </TabsMantine.Tab>
        ))}
      </TabsMantine.List>

      {tabs.map((tab) => (
        <TabsMantine.Panel key={tab.value} value={tab.value}>
          {tab.content}
        </TabsMantine.Panel>
      ))}
    </TabsMantine>
  );
};
