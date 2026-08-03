export default function apiError(error: unknown) {
  return {
    ok: false,
    data: null,
    errors: {
      form: error instanceof Error ? error.message : "Unknown error.",
    },
  };
}
