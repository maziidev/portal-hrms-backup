Here’s a clean list of **all the endpoints** from the HRMS API you shared, organized by category:

---

## 📘 Sessions & Semesters API

All require authentication (Bearer token). Base URL: `BASE_URL/hrms/`

### Semester Endpoints

1. **List & Create Semesters**

   * `GET /semester_list_create/` → List latest 10 semesters (optional `session_id` query param)
   * `POST /semester_list_create/?session_id=<session_id>` → Create semester

2. **Semester Detail**

   * `GET /semesters/{semester_id}/` → Retrieve one semester
   * `PUT /semesters/{semester_id}/` or `PATCH /semesters/{semester_id}/` → Update semester (`session_id` required)
   * `DELETE /semesters/{semester_id}/` → Delete semester

### Active Session & Semester

3. **Set Active Session** → `POST /set_active_session/{session_id}/`
4. **Set Active Semester** → `POST /set_active_semester/{semester_id}/`
5. **Get Active Session & Semester** → `GET /get_active_session_semester/`

---

## 📊 Appraisal, Leave & Staff Statistics API

### Appraisal Statistics

1. **Appraisal Overview Stats** → `GET /appraisals/stats/`

### Leave & Appraisal Summary

2. **Leave & Appraisal Summary Stats** → `GET /leave_appraisal_summary_stats/`

### Staff Summary

3. **Staff Summary Stats** → `GET /staff_summary_stats/`

### Staff Details

4. **Detailed Staff Information** → `GET /detailed_staff_info/{staff_id}/`

### Appraisal Records

5. **Completed Appraisals** → `GET /completed_appraisals/stats/` (optional `period_id`, `staff_id`)

### Appraisal Periods

6. **Past Appraisal Periods** → `GET /past_appraisal_periods/`
7. **Active Appraisal Period** → `GET /active_appraisal_period/`

---

## 🏖️ Leave Management API

1. **Leave Summary Stats** → `GET /leave_stats/`
2. **Leave Type Stats** → `GET /leave_type_stats/`
3. **List Leaves** → `GET /list_leaves/` (filters: `status`, `leave_type`, `is_active`, `staff_id`, `start_from`, `start_to`, `q`)
4. **Leave Detail** → `GET /leave_detail/{leave_id}/`

---

## ⬆️ Promotion API

1. **Promotion Summary Stats** → `GET /promotion_stats/`
2. **List Promotions** → `GET /list_promotions/` (filters: `status`, `q`)
3. **Promotion Detail** → `GET /promotion_detail/{promotion_id}/`

---

If you want, I can now **map all these endpoints directly into one consolidated “Staff Activity API” service** for your table so the frontend never needs to call multiple endpoints manually. This would exactly match the StaffActivityTable we discussed earlier.

Do you want me to do that next?
