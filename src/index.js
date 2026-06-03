import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//context
import { SidebarProvider } from "./context/SidebarContext";

//components
import Sidebar from "./components/Sidebar/Sidebar";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<SidebarProvider>
				<App />
				<Sidebar />
			</SidebarProvider>
		</BrowserRouter>
	</QueryClientProvider>,
);
