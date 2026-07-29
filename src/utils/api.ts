export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api";

// ==========================================
//  USERS E LOGIN
// ==========================================

export function USER_POST(body: Record<string, unknown>) {
  return {
    url: `${API_URL}/users`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_POST(body: Record<string, unknown>) {
  return {
    url: `${API_URL}/auth`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token: string) {
  return {
    url: `${API_URL}/me`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function USER_PROFILE_GET(username: string, token?: string) {
  return {
    url: `${API_URL}/users/profile/${username}`,
    options: {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  };
}

export function USER_UPDATE_PUT(formData: FormData, token: string) {
  return {
    url: `${API_URL}/users/update`,
    options: {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
}

export function USER_DELETE(token: string, id?: string) {
  const endpoint = id ? `${API_URL}/users/${id}` : `${API_URL}/users/delete`;
  return {
    url: endpoint,
    options: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

// ==========================================
//  GATOS
// ==========================================

export function CAT_POST(body: Record<string, unknown>, token: string) {
  return {
    url: `${API_URL}/cat`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_CATS_GET(userId: string) {
  return {
    url: `${API_URL}/users/${userId}/cats`,
    options: {
      method: "GET",
    },
  };
}

export function CAT_GET(id: string, token: string) {
  return {
    url: `${API_URL}/cat/${id}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function CAT_PUT(id: string, formData: FormData, token: string) {
  return {
    url: `${API_URL}/cat/${id}`,
    options: {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
}

export function CAT_DELETE(id: string, token: string) {
  return {
    url: `${API_URL}/cat/${id}`,
    options: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

// ==========================================
// POSTS (FEED)
// ==========================================

export function POSTS_GET({
  page = 1,
  limit = 10,
}: { page?: number; limit?: number } = {}) {
  return {
    url: `${API_URL}/posts?page=${page}&limit=${limit}`,
    options: {
      method: "GET",
    },
  };
}

export function POST_POST(catId: string, formData: FormData, token: string) {
  return {
    url: `${API_URL}/post/${catId}`,
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
}

export function POST_PUT(
  id: string,
  body: Record<string, unknown>,
  token: string,
) {
  return {
    url: `${API_URL}/post/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  };
}

export function POST_DELETE(id: string, token: string) {
  return {
    url: `${API_URL}/post/${id}`,
    options: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

// ==========================================
// LIKES
// ==========================================

export function LIKE_POST(postId: string, token: string) {
  return {
    url: `${API_URL}/like/${postId}`,
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

// ==========================================
// COMENTÁRIOS
// ==========================================

export function COMMENT_POST(
  postId: string,
  body: Record<string, unknown>,
  token: string,
) {
  return {
    url: `${API_URL}/comment/${postId}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  };
}

export function COMMENTS_GET(postId: string) {
  return {
    url: `${API_URL}/comments/${postId}`,
    options: {
      method: "GET",
    },
  };
}

export function COMMENT_PUT(
  id: string,
  body: Record<string, unknown>,
  token: string,
) {
  return {
    url: `${API_URL}/comment/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  };
}

export function COMMENT_DELETE(id: string, token: string) {
  return {
    url: `${API_URL}/comment/${id}`,
    options: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}
