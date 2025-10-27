"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CreateResourceForm } from "@/components/forms/CreateResourceForm";
import { Alert } from "@/components/feedback/Alert";

import { useCreateResourceMutation } from "@/lib/api/useCreateResourceMutation";

export default function DashboardPage() {
  // estado modal
  const [open, setOpen] = useState(false);

  // último creado con éxito para mostrar feedback
  const [lastCreated, setLastCreated] = useState<
    { title: string; category: string } | undefined
  >(undefined);

  const { createResource, isLoading, error } = useCreateResourceMutation({
    onSuccess: (res) => {
      // res es el recurso creado que devuelve la API simulada
      setLastCreated({
        title: res.title,
        category: res.category
      });
      setOpen(false);
    },
    onError: () => {
      // el error ya lo recibimos en `error`, así que aquí no hacemos nada extra
    }
  });

  // Esta función se la pasamos al formulario
  function handleCreateResource(data: {
    title: string;
    description: string;
    category: string;
    visibility: string;
  }) {
    createResource({
      title: data.title,
      description: data.description,
      category: data.category,
      visibility: data.visibility
    });
  }

  return (
    <>
      {/* GRID PRINCIPAL DEL DASHBOARD */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Acción rápida */}
        <Card>
          <CardHeader
            title="Acción rápida"
            description="Crea algo nuevo inmediatamente"
          />
          <CardContent>
            <Button
              className="w-full"
              onClick={() => {
                setOpen(true);
              }}
            >
              Crear recurso
            </Button>
          </CardContent>
        </Card>

        {/* Estado actual */}
        <Card>
          <CardHeader
            title="Estado actual"
            description="Resumen de actividad reciente"
          />
          <CardContent className="space-y-3">
            {lastCreated ? (
              <Alert
                variant="success"
                title="Recurso creado correctamente"
                description={`"${lastCreated.title}" (${lastCreated.category}) ya está disponible.`}
              />
            ) : (
              <ul className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-1">
                <li>• Item A actualizado hace 2h</li>
                <li>• Item B pendiente de aprobación</li>
                <li>• 3 notificaciones nuevas</li>
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Próximos pasos */}
        <Card className="md:col-span-2 xl:col-span-1">
          <CardHeader
            title="Próximos pasos"
            description="Te recomendamos hacer esto ahora:"
          />
          <CardContent>
            <ol className="list-decimal pl-4 text-sm text-[var(--text-primary)] space-y-2">
              <li>Completa tu perfil</li>
              <li>Invita a tu equipo</li>
              <li>Activa notificaciones</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* MODAL CREAR RECURSO */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Crear recurso"
        description="Completa la información básica. Podrás editarlo luego."
        size="md"
      >
        <CreateResourceForm
          onSubmit={handleCreateResource}
          isLoading={isLoading}
          error={error?.message}
        />
      </Modal>
    </>
  );
}
