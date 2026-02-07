import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	{ path: "signin", file: "routes/signin.tsx" },
] satisfies RouteConfig;
