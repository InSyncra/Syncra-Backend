import React from "react";

type Props = {};

const ContributionsPage = (props: Props) => {
  return (
    <div>
      <p>
        Thank you for your interest in contributing to Syncra&#39;s Backend! We
        welcome any contributions, whether it&#39;s bug reports, feature
        requests, or code contributions.
      </p>
      <h2 id="bug-reports">Bug Reports</h2>
      <p>
        If you encounter a bug or an issue with the project, please follow these
        steps to report it:
      </p>
      <ol>
        <li>
          Check if the issue has already been reported by searching the
          project&#39;s issue tracker.
        </li>
        <li>
          If you can&#39;t find an existing issue, open a new issue in the
          project&#39;s issue tracker.
        </li>
        <li>
          Provide as much detail as possible about the bug, including steps to
          reproduce and any error messages.
        </li>
      </ol>
      <h2 id="feature-requests">Feature Requests</h2>
      <p>
        If you have an idea for a new feature or an improvement to an existing
        feature, please follow these steps to request it:
      </p>
      <ol>
        <li>
          Check if the feature has already been requested by searching the
          project&#39;s issue tracker.
        </li>
        <li>
          If you can&#39;t find an existing request, open a new issue in the
          project&#39;s issue tracker.
        </li>
        <li>
          Provide a clear description of the feature and any relevant context.
        </li>
      </ol>
      <h2 id="code-contributions">Code Contributions</h2>
      <p>
        If you&#39;re interested in contributing code to the project, please
        follow these steps:
      </p>
      <ol>
        <li>Fork the repository to your own GitHub account.</li>
        <li>Create a new branch for your changes.</li>
        <li>Make the necessary changes and commit them.</li>
        <li>Push the changes to your fork.</li>
        <li>Open a pull request with a clear description of the changes.</li>
      </ol>
      <h2 id="code-style">Code Style</h2>
      <p>
        We follow a specific code style for the project. Please make sure to
        follow these guidelines when contributing code:
      </p>
      <ul>
        <li>Use camelCase for variable and function names.</li>
        <li>Use double quotes for strings.</li>
        <li>Use semicolons at the end of statements.</li>
        <li>Use meaningful and descriptive variable and function names.</li>
      </ul>
      <h2 id="license">License</h2>
      <p>
        By contributing to Syncra-Backend, you agree to license your
        contributions under the <a href="LICENSE">MIT License</a>.
      </p>
      <h2 id="code-of-conduct">Code of Conduct</h2>
      <p>
        We expect all contributors to adhere to our{" "}
        <a href="CODE_OF_CONDUCT.md">Code of Conduct</a>.
      </p>
      <p>Thank you for your contributions!</p>
    </div>
  );
};

export default ContributionsPage;
