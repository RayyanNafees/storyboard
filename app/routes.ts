import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("settings", "routes/settings.tsx",)
,
 route("editor", "routes/editor.tsx",)

] satisfies RouteConfig;
