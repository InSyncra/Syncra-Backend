export default [
	{
		ignores: ["**/node_modules/", "**/dist/", "**/*.json"],
		rules: {
			semi: "error",
			"prefer-const": "warn",
			"no-var": "error",
			"no-console": "error",
			"no-unused-vars": "error",
			"no-restricted-syntax": "error",
		},
	},
];
