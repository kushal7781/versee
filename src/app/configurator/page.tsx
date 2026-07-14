import CategorySidebar from "@/components/configurator/CategorySidebar";
import ProductList from "@/components/configurator/ProductList";
import BuildSummary from "@/components/configurator/BuildSummary";

export const metadata = {
  title: "PC Builder - PCVerse",
  description: "Build your custom PC with compatibility checking and live pricing.",
};

export default function ConfiguratorPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] bg-background text-white overflow-hidden relative">
      
      {/* Background styling for the builder to keep it consistent with the dark theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black -z-10" />

      {/* Main Layout Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-72px)]">
        
        {/* Left Sidebar: Categories (Hidden on very small mobile, but we can make it an accordion later. For now, flex column on mobile) */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-2 border-r border-white/10 bg-black/40 backdrop-blur-md">
          <CategorySidebar />
        </div>

        {/* Center: Product Selection */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-7 overflow-hidden relative">
          {/* Subtle gradient overlay to match aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <ProductList />
        </div>

        {/* Right Sidebar: Build Summary */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-3">
          <BuildSummary />
        </div>

      </div>

      {/* Mobile Sticky Summary & Categories Toggle - to be fully fleshed out, basic version here */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 z-50">
        <div className="flex items-center justify-between">
          <span className="font-bold">PC Builder</span>
          <button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-lg">
            View Summary
          </button>
        </div>
      </div>
    </div>
  );
}
