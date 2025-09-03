import { useState, createContext, useContext } from "react";
const TabsContext = createContext();

export function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }) {
  return <div className="flex border-b">{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const { active, setActive } = useContext(TabsContext);
  const isActive = active === value;

  return (
    <button
      onClick={() => setActive(value)}
      className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 transition ${
        isActive
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div className="p-4">{children}</div>;
}
