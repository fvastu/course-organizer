import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const branchData = [
  { branch: "main", commits: 12 },
  { branch: "develop", commits: 9 },
  { branch: "feature/auth", commits: 5 },
  { branch: "feature/ui", commits: 4 },
];

export function GitStructureChart() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Card className="border-primary/30 bg-secondary/50">
        <CardHeader>
          <CardTitle className="text-lg">Struttura Git (esempio rami e commit)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="branch" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="commits" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Pattern consigliato: feature branch brevi, merge su develop, release controllata su main.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
