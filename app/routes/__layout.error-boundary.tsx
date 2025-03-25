import ErrorBoundaryComponent from '~/src/components/ErrorBoundaryBase';

export async function loader() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(''));
    }, 1000);
  }).then(() => {
    return {
      data: [],
      error: null,
    };
  });
}

export function ErrorBoundary() {
  return <ErrorBoundaryComponent />;
}
