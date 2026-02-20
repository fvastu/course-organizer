import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type LessonUpdateInput } from "@shared/routes";

export function useLessons() {
  return useQuery({
    queryKey: [api.lessons.list.path],
    queryFn: async () => {
      const res = await fetch(api.lessons.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Errore nel caricamento delle lezioni");
      return api.lessons.list.responses[200].parse(await res.json());
    },
  });
}

export function useLesson(id: number) {
  return useQuery({
    queryKey: [api.lessons.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.lessons.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Errore nel caricamento della lezione");
      return api.lessons.get.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & LessonUpdateInput) => {
      const validated = api.lessons.update.input.parse(updates);
      const url = buildUrl(api.lessons.update.path, { id });
      const res = await fetch(url, {
        method: api.lessons.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 404) throw new Error("Lezione non trovata");
        if (res.status === 400) {
           // Try to parse validation error
           try {
             const errorData = await res.json();
             const error = api.lessons.update.responses[400].parse(errorData);
             throw new Error(error.message);
           } catch (e) {
             throw new Error("Dati non validi");
           }
        }
        throw new Error("Errore nell'aggiornamento");
      }
      return api.lessons.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.lessons.list.path] });
    },
  });
}
