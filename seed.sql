-- ============================================================
-- KINETIC ONE HARDWARE SEED DATA
-- ============================================================

INSERT OR IGNORE INTO batches (id, batch_name, total_units, reserved_units, production_stage, shipping_target, unit_price_inr, is_active) VALUES
  ('batch_01', 'Founders Batch 01 (Machined Titanium)', 500, 472, 'qa_chamber', 'Nov 15, 2026', 24999, 1),
  ('batch_02', 'Commercial Batch 02 (Anodized Aluminum)', 2000, 310, 'sourcing', 'Jan 10, 2027', 22999, 0);

INSERT OR IGNORE INTO preorders (id, serial_number, batch_id, customer_name, email, phone, colorway, custom_engraving, total_amount, payment_status) VALUES
  ('pre_001', 'KNTC-001', 'batch_01', 'Arjun Vasudevan', 'arjun@kntc.audio', '+91 98401 22990', 'Matte Obsidian', 'STUDIO-01', 24999, 'paid'),
  ('pre_002', 'KNTC-002', 'batch_01', 'Lukas Lindqvist', 'lukas@nordicdsp.se', '+46 70 123 4567', 'Cyber Safety Orange', 'LINDQVIST', 24999, 'paid'),
  ('pre_003', 'KNTC-003', 'batch_01', 'Nadia Chen', 'nadia@syncretic.design', '+1 415 889 0122', 'Industrial Bone', 'POLYPHONIC', 24999, 'paid');
