export default [
    {
        ignores: ["**/node_modules/", "**/dist/", "**/*.json"],
        rules: {
            semi: "error",
            "prefer-const": "error",
            "no-var": "error",
            "no-console": "warn",
            "no-undef": "warn",
            "no-unused-vars": "warn",
            "no-restricted-syntax": "error",
        },
    },
];
