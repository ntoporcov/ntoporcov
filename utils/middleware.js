export const cors = {
  methods: ["GET", "POST", "HEAD"],
  origin: [
    "https://ntoporcov.com",
    "https://dev.ntoporcov.com",
    "https://nict.me",
    "http://localhost:3000",
  ],
  optionsSuccessStatus: 200,
};

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
