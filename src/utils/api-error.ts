export default function apiError(error: unknown) {
  return {
    ok: false,
    data: null,
    errors: {
      form:
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "Unknown error.",
    },
  };
}
