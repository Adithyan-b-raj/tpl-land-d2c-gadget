-- ============================================================
-- KINETIC ONE AUDIO HARDWARE D1 DATABASE SCHEMA
-- ============================================================

CREATE TABLE IF NOT EXISTS batches (
  id TEXT PRIMARY KEY,
  batch_name TEXT NOT NULL,
  total_units INTEGER NOT NULL DEFAULT 500,
  reserved_units INTEGER NOT NULL DEFAULT 470,
  production_stage TEXT DEFAULT 'qa_chamber', -- 'sourcing', 'smt_assembly', 'qa_chamber', 'packaging', 'air_freight'
  shipping_target TEXT NOT NULL,
  unit_price_inr INTEGER NOT NULL DEFAULT 24999,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS preorders (
  id TEXT PRIMARY KEY,
  serial_number TEXT UNIQUE,
  batch_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  colorway TEXT DEFAULT 'Matte Obsidian',
  custom_engraving TEXT,
  total_amount INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'paid', -- 'pending', 'paid', 'refunded'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (batch_id) REFERENCES batches(id)
);

CREATE TABLE IF NOT EXISTS hardware_telemetry (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  frequency_hz INTEGER,
  spl_db REAL,
  thd_percent REAL,
  profile_name TEXT
);

CREATE INDEX IF NOT EXISTS idx_preorders_batch ON preorders(batch_id);
CREATE INDEX IF NOT EXISTS idx_preorders_serial ON preorders(serial_number);
