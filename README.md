# Cooked AI

Cooked AI is a nutrition assistant for endurance athletes. The MVP parses TrainingPeaks CSV exports, generates summaries and plots, and uploads workouts to Supabase.

## Repo Structure

```
backend/   # Python scripts + future API
frontend/  # Web app
supabase/  # Migrations
```

## Quickstart

### 1) Create and activate a virtual environment

macOS/Linux:

```bash
python -m venv .venv
source .venv/bin/activate
```

Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 2) Install backend dependencies

```bash
pip install -r backend/requirements.txt
```

### 3) Configure environment variables

```bash
cp .env.example .env
```

Fill in `SUPABASE_URL` and either `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_ANON_KEY`.

### 4) Run scripts

macOS/Linux:

```bash
cd backend
PYTHONPATH=src python scripts/tp_extract_and_viz.py --input "../data/tp.csv" --outdir "out"
PYTHONPATH=src python scripts/tp_to_supabase.py --input "../data/tp.csv" --athlete_id "josep"
```

Windows PowerShell:

```powershell
cd backend
$env:PYTHONPATH="src"
python scripts\tp_extract_and_viz.py --input "..\data\tp.csv" --outdir "out"
python scripts\tp_to_supabase.py --input "..\data\tp.csv" --athlete_id "josep"
```
