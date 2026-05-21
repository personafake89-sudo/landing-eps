# Guía de Modificación y Despliegue — Landing EPS EMAQ

## Requisitos previos

- Git configurado con acceso al repo `personafake89-sudo/landing-eps`
- Node.js instalado
- Cuenta Vercel vinculada al repo (auto-deploy activo)

---

## Flujo de trabajo

### 1. Ir al directorio del proyecto

```bash
cd /home/personafake/landing-eps
```

### 2. Verificar estado actual

```bash
git status
```

### 3. Modificar archivos

Los componentes están en `src/components/`:

| Archivo | Qué contiene |
|---|---|
| `Navbar.tsx` | Top bar (contacto/redes) + navbar principal |
| `Hero.tsx` | Sección principal con botones CTA |
| `HowItWorks.tsx` | Pasos de cómo funciona |
| `PaymentSection.tsx` | Formulario de consulta y pago |
| `Services.tsx` | Tarjetas de servicios |
| `Footer.tsx` | Footer 4 columnas |
| `BackgroundSlideshow.tsx` | Fondo animado con imágenes |

### 4. Verificar que no hay errores antes de subir

```bash
npx tsc --noEmit
```

Si no imprime nada → todo bien.

### 5. Subir cambios

```bash
git add src/components/NombreArchivo.tsx
git commit -m "descripcion del cambio"
git push
```

O para subir todos los archivos modificados de una vez:

```bash
git add src/
git commit -m "descripcion del cambio"
git push
```

### 6. Ver el deploy

Vercel detecta el push automáticamente y redespliega en **1-2 minutos**.

- URL producción: https://landing-eps.vercel.app
- Panel Vercel: https://vercel.com/personafake89-sudos-projects/landing-eps

---

## Parámetros frecuentes

### Cambiar transparencia de una sección

Busca `bg-white/` seguido de un número. El número es el porcentaje de opacidad:

```
bg-white/70   → 70% opaco (semi-transparente)
bg-white/90   → casi sólido
bg-white      → blanco puro
```

### Cambiar tamaño de imagen

Busca `h-` seguido de un número en el `className` de la imagen:

```
h-8  → 32px
h-12 → 48px
h-20 → 80px
h-24 → 96px
```

### Cambiar texto

Abre el componente correspondiente y edita directamente el texto entre las etiquetas.

---

## Datos reales del sitio

| Campo | Valor |
|---|---|
| Teléfono 1 | 973 598 606 |
| Teléfono 2 | 973 597 095 |
| Email consultas | consultas@epsemaq.com.pe |
| Email reclamos | reclamos@epsemaq.com.pe |
| WhatsApp | https://wa.me/51973598606 |
| Facebook | https://www.facebook.com/p/EPS-EMAQ-Quillabamba-100063889960218 |
| Instagram | https://www.instagram.com/eps_emaq_sa |
| YouTube | https://www.youtube.com/@EPSEMAQS.A |
| TikTok | https://www.tiktok.com/@eps.emaq.s.a |

---

## Comandos útiles

```bash
# Ver últimos cambios subidos
git log --oneline -5

# Descartar cambios locales en un archivo
git checkout -- src/components/NombreArchivo.tsx

# Ver diferencias antes de commitear
git diff src/components/NombreArchivo.tsx
```
