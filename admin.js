// Logik Panel Pentadbir (Admin) MPP UTHM 2026/2027
// Membenarkan admin mengubah SEMUA DATA profil, hirarki carta pokok, dan melihat TERPERINCI aduan (Excel ready)

document.addEventListener("DOMContentLoaded", () => {
  const mppTableBody = document.getElementById("mppTableBody");
  const aduanTableBody = document.getElementById("aduanTableBody");
  const totalMppCount = document.getElementById("totalMppCount");
  const totalAduanCount = document.getElementById("totalAduanCount");
  const totalIgCount = document.getElementById("totalIgCount");
  const totalSelesaiCount = document.getElementById("totalSelesaiCount");

  // Modal elements: Edit MPP
  const mppEditModal = document.getElementById("mppEditModal");
  const closeMppModalBtn = document.getElementById("closeMppModalBtn");
  const mppEditForm = document.getElementById("mppEditForm");
  const btnOpenAddMppModal = document.getElementById("btnOpenAddMppModal");
  const mppModalTitle = document.getElementById("mppModalTitle");

  // Modal elements: Status Aduan
  const statusModal = document.getElementById("statusModal");
  const statusUpdateForm = document.getElementById("statusUpdateForm");
  const statusAduanId = document.getElementById("statusAduanId");
  const statusAduanSubject = document.getElementById("statusAduanSubject");
  const selectNewStatus = document.getElementById("selectNewStatus");
  const aduanStatusFilter = document.getElementById("aduanStatusFilter");

  // Modal elements: Paparan Terperinci Aduan (Detail View)
  const aduanDetailModal = document.getElementById("aduanDetailModal");
  const detailRefNumber = document.getElementById("detailRefNumber");
  const detailStatusBadge = document.getElementById("detailStatusBadge");
  const detailCreatedAt = document.getElementById("detailCreatedAt");
  const detailModPengadu = document.getElementById("detailModPengadu");
  const detailStudentName = document.getElementById("detailStudentName");
  const detailStudentMatric = document.getElementById("detailStudentMatric");
  const detailStudentEmail = document.getElementById("detailStudentEmail");
  const detailCampus = document.getElementById("detailCampus");
  const detailChannelName = document.getElementById("detailChannelName");
  const detailChannelUrl = document.getElementById("detailChannelUrl");
  const detailChannelIg = document.getElementById("detailChannelIg");
  const detailSubject = document.getElementById("detailSubject");
  const detailDetails = document.getElementById("detailDetails");
  const btnDetailUpdateStatus = document.getElementById("btnDetailUpdateStatus");
  const btnDetailDelete = document.getElementById("btnDetailDelete");

  const btnResetDefault = document.getElementById("btnResetDefault");

  let currentViewingAduanId = null;

  // Faculty mapping helper
  const facultyNames = {
    "FSKTM": "Fakulti Sains Komputer dan Teknologi Maklumat",
    "FKEE": "Fakulti Kejuruteraan Elektrik dan Elektronik",
    "FKMP": "Fakulti Kejuruteraan Mekanikal dan Pembuatan",
    "FKAAB": "Fakulti Kejuruteraan Awam dan Alam Bina",
    "FPTP": "Fakulti Pengurusan Teknologi dan Perniagaan",
    "FPTV": "Fakulti Pendidikan Teknikal dan Vokasional",
    "FAST": "Fakulti Sains Gunaan dan Teknologi",
    "FTK": "Fakulti Teknologi Kejuruteraan (Pagoh)"
  };

  // Switch Tabs
  window.switchAdminTab = function(tab) {
    document.getElementById("tabAduanBtn").classList.toggle("active", tab === "aduan");
    document.getElementById("tabMppBtn").classList.toggle("active", tab === "mpp");
    document.getElementById("panelAduan").classList.toggle("active", tab === "aduan");
    document.getElementById("panelMpp").classList.toggle("active", tab === "mpp");
  };

  function updateOverviewStats() {
    const mppList = window.mppStorage.getData();
    const aduanList = window.mppStorage.getComplaints();

    totalMppCount.textContent = mppList.length;
    totalAduanCount.textContent = aduanList.length;
    totalIgCount.textContent = mppList.filter(m => m.instagram).length;
    totalSelesaiCount.textContent = aduanList.filter(a => a.status === "Selesai").length;
  }

  // Render MPP Management Table (Organisasi MPP - Papar Semua Data)
  function renderMppTable() {
    const mppList = window.mppStorage.getData();
    mppTableBody.innerHTML = "";

    mppList.forEach(mpp => {
      const tierBadge = mpp.tier === "ydp" ? '<span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:12px; font-weight:700; font-size:0.75rem;">YDP (Peringkat 1)</span>' :
                        mpp.tier === "tydp" ? '<span style="background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:12px; font-weight:700; font-size:0.75rem;">TYDP (Peringkat 2)</span>' :
                        mpp.tier === "mt" ? '<span style="background:#f3e8ff; color:#6b21a8; padding:2px 8px; border-radius:12px; font-weight:700; font-size:0.75rem;">MT (Peringkat 3)</span>' :
                        '<span style="background:#f1f5f9; color:#475569; padding:2px 8px; border-radius:12px; font-weight:700; font-size:0.75rem;">Exco (Peringkat 4)</span>';

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <img src="${mpp.avatar}" alt="${mpp.name}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(mpp.name)}&background=003366&color=fff'">
        </td>
        <td>
          <strong>${mpp.name}</strong><br>
          <small style="color: #64748b;">${mpp.office || 'Bilik Gerakan HEP'}</small>
        </td>
        <td>${tierBadge}</td>
        <td><strong style="color: #003366;">${mpp.position}</strong></td>
        <td>${mpp.department}</td>
        <td><span class="faculty-badge" style="color: #003366; background: #e0f2fe; border: none;">${mpp.faculty}</span></td>
        <td><small style="font-weight:700;">${mpp.matricNo}</small></td>
        <td>
          <a href="mailto:${mpp.email}" style="color: #003366; font-size: 0.8rem;">${mpp.email}</a><br>
          <small style="color: #64748b;">${mpp.phone || '-'}</small>
        </td>
        <td>
          <a href="https://instagram.com/${mpp.instagram}" target="_blank" rel="noopener noreferrer" style="color: #e1306c; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-size: 0.82rem;">
            <i class="fa-brands fa-instagram"></i> @${mpp.instagram}
          </a>
        </td>
        <td>
          <button class="btn-action-small btn-edit" onclick="editMppMember(${mpp.id})" title="Kemaskini Semua Data">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button class="btn-action-small btn-delete" onclick="deleteMppMember(${mpp.id})" title="Padam Ahli">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      mppTableBody.appendChild(tr);
    });
  }

  // Render Complaints Table (Organisasi MPP & Pautan Sistem UTHM & Butang Lihat Terperinci)
  function renderAduanTable() {
    const aduanList = window.mppStorage.getComplaints();
    const filterStatus = aduanStatusFilter.value;
    aduanTableBody.innerHTML = "";

    const filtered = aduanList.filter(a => {
      return filterStatus === "ALL" || a.status === filterStatus;
    });

    if (filtered.length === 0) {
      aduanTableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #888; padding: 24px;">Tiada rekod aduan buat masa ini.</td></tr>`;
      return;
    }

    filtered.forEach(aduan => {
      let statusClass = "badge-pending";
      if (aduan.status === "Dalam Tindakan") statusClass = "badge-investigating";
      if (aduan.status === "Selesai") statusClass = "badge-completed";

      const anonBadge = aduan.isAnonymous ?
        '<span style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 2px 8px; border-radius: 12px; font-size: 0.72rem; font-weight: 800;"><i class="fa-solid fa-user-secret"></i> Anonymous</span>' :
        '<span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-size: 0.72rem; font-weight: 700;">Berdaftar</span>';

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color: #003366;">${aduan.id}</strong></td>
        <td><small style="color: #64748b;">${aduan.createdAt || '-'}</small></td>
        <td>${anonBadge}</td>
        <td>
          <strong>${aduan.studentName}</strong><br>
          <small style="color: #64748b;">${aduan.studentMatric} • ${aduan.campus || 'UTHM'}</small>
        </td>
        <td>
          <strong style="color: #003366;">${aduan.channelName || 'Organisasi MPP UTHM'}</strong>
          <br>
          <a href="${aduan.channelUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; color: #0284c7; text-decoration: none;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Pautan Sistem UTHM
          </a>
        </td>
        <td>
          <strong>${aduan.subject}</strong>
        </td>
        <td>
          <span class="badge-status ${statusClass}">${aduan.status}</span>
        </td>
        <td>
          <button class="btn-action-small btn-view-detail" onclick="viewAduanDetail('${aduan.id}')" title="Buka Maklumat Terperinci Aduan">
            <i class="fa-solid fa-eye"></i> Terperinci
          </button>
          <button class="btn-action-small btn-edit" onclick="openStatusUpdateModal('${aduan.id}')" title="Tukar Status Tindakan">
            <i class="fa-solid fa-arrows-rotate"></i> Status
          </button>
          <button class="btn-action-small btn-delete" onclick="deleteComplaint('${aduan.id}')" title="Padam Rekod">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      aduanTableBody.appendChild(tr);
    });
  }

  // BUKA PAPARAN TERPERINCI ADUAN (VIEW DETAIL MODAL)
  window.viewAduanDetail = function(id) {
    const list = window.mppStorage.getComplaints();
    const aduan = list.find(a => a.id === id);
    if (!aduan) return;

    currentViewingAduanId = aduan.id;

    // Header & Meta
    detailRefNumber.textContent = `No Rujukan: ${aduan.id}`;
    detailCreatedAt.textContent = aduan.createdAt || "-";
    detailStatusBadge.textContent = aduan.status;
    detailStatusBadge.className = `badge-status ${
      aduan.status === "Selesai" ? "badge-completed" :
      aduan.status === "Dalam Tindakan" ? "badge-investigating" : "badge-pending"
    }`;

    // Maklumat Pelajar
    if (aduan.isAnonymous) {
      detailModPengadu.innerHTML = '<span style="background: #f1f5f9; color: #1e293b; padding: 3px 10px; border-radius: 12px; font-weight: 800; border: 1px solid #cbd5e1;"><i class="fa-solid fa-user-secret"></i> Anonymous (Identiti Dirahsiakan)</span>';
      detailStudentName.textContent = "Pelajar Tanpa Nama (Anonymous)";
      detailStudentMatric.textContent = "DIRAHSIAKAN OLEH SISTEM";
      detailStudentEmail.textContent = "anonymous@siswa.uthm.edu.my";
    } else {
      detailModPengadu.innerHTML = '<span style="background: #dbeafe; color: #1e40af; padding: 3px 10px; border-radius: 12px; font-weight: 700;">Mahasiswa Berdaftar</span>';
      detailStudentName.textContent = aduan.studentName || "-";
      detailStudentMatric.textContent = aduan.studentMatric || "-";
      detailStudentEmail.textContent = aduan.studentEmail || "-";
    }
    detailCampus.textContent = aduan.campus || "Kampus Induk Parit Raja";

    // Pautan Sistem UTHM
    detailChannelName.textContent = aduan.channelName || "Organisasi Majlis Perwakilan Pelajar (MPP UTHM)";
    detailChannelUrl.textContent = aduan.channelUrl || "https://community.uthm.edu.my";
    detailChannelUrl.href = aduan.channelUrl || "#";
    detailChannelIg.textContent = `@${aduan.channelInstagram || 'mpputhm_official'}`;
    detailChannelIg.href = `https://www.instagram.com/${aduan.channelInstagram || 'mpputhm_official'}/`;

    // Isi Kandungan Penuh
    detailSubject.textContent = aduan.subject || "-";
    detailDetails.textContent = aduan.details || "-";

    aduanDetailModal.classList.add("active");
  };

  // Butang Dalam Paparan Terperinci untuk Kemaskini Status Terus
  btnDetailUpdateStatus.addEventListener("click", () => {
    if (currentViewingAduanId) {
      aduanDetailModal.classList.remove("active");
      openStatusUpdateModal(currentViewingAduanId);
    }
  });

  // Butang Dalam Paparan Terperinci untuk Padam Terus
  btnDetailDelete.addEventListener("click", () => {
    if (currentViewingAduanId) {
      deleteComplaint(currentViewingAduanId);
      aduanDetailModal.classList.remove("active");
    }
  });

  // Buka Modal Edit Ahli MPP (Ubah SEMUA data)
  window.editMppMember = function(id) {
    const list = window.mppStorage.getData();
    const item = list.find(m => m.id === id);
    if (!item) return;

    mppModalTitle.textContent = "Kemaskini SEMUA Maklumat Ahli MPP";
    document.getElementById("editMppId").value = item.id;
    document.getElementById("formMppName").value = item.name;
    document.getElementById("formMppTier").value = item.tier || "exco";
    document.getElementById("formMppPosition").value = item.position;
    document.getElementById("formMppDept").value = item.department;
    document.getElementById("formMppFaculty").value = item.faculty;
    document.getElementById("formMppFacultyFull").value = item.facultyFullName || facultyNames[item.faculty] || "";
    document.getElementById("formMppMatric").value = item.matricNo;
    document.getElementById("formMppEmail").value = item.email;
    document.getElementById("formMppPhone").value = item.phone || "";
    document.getElementById("formMppOffice").value = item.office || "";
    document.getElementById("formMppIg").value = item.instagram;
    document.getElementById("formMppAvatar").value = item.avatar || "";
    document.getElementById("formMppQuote").value = item.quote || "";

    // Ambil data post feed sekiranya ada
    if (item.recentPosts && item.recentPosts.length > 0) {
      document.getElementById("formPostImage").value = item.recentPosts[0].image || "";
      document.getElementById("formPostLikes").value = `${item.recentPosts[0].likes || '320'} sukaan • ${item.recentPosts[0].comments || '18'} komen`;
      document.getElementById("formPostCaption").value = item.recentPosts[0].caption || "";
    } else {
      document.getElementById("formPostImage").value = "";
      document.getElementById("formPostLikes").value = "";
      document.getElementById("formPostCaption").value = "";
    }

    mppEditModal.classList.add("active");
  };

  // Tambah Ahli MPP Baharu
  btnOpenAddMppModal.addEventListener("click", () => {
    mppModalTitle.textContent = "Tambah Ahli MPP Baharu Sesi 2026/2027";
    mppEditForm.reset();
    document.getElementById("editMppId").value = "";
    document.getElementById("formMppTier").value = "exco";
    document.getElementById("formMppAvatar").value = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
    document.getElementById("formPostImage").value = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600";
    mppEditModal.classList.add("active");
  });

  // Simpan Form Perubahan Semua Data
  mppEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const list = window.mppStorage.getData();
    const idVal = document.getElementById("editMppId").value;
    const facCode = document.getElementById("formMppFaculty").value;
    const fullFac = document.getElementById("formMppFacultyFull").value.trim() || facultyNames[facCode] || "Fakulti UTHM";

    const postImg = document.getElementById("formPostImage").value.trim() || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600";
    const postCaption = document.getElementById("formPostCaption").value.trim() || `Aktiviti kepimpinan bersama mahasiswa Fakulti ${facCode} & program kampus 2026/27.`;

    const memberData = {
      name: document.getElementById("formMppName").value.trim(),
      tier: document.getElementById("formMppTier").value,
      position: document.getElementById("formMppPosition").value.trim(),
      department: document.getElementById("formMppDept").value,
      faculty: facCode,
      facultyFullName: fullFac,
      matricNo: document.getElementById("formMppMatric").value.trim(),
      email: document.getElementById("formMppEmail").value.trim(),
      phone: document.getElementById("formMppPhone").value.trim() || "+60 11-0000 0000",
      office: document.getElementById("formMppOffice").value.trim() || "Bilik Gerakan MPP, Aras 2 Bangunan HEP",
      instagram: document.getElementById("formMppIg").value.trim().replace("@", ""),
      avatar: document.getElementById("formMppAvatar").value.trim() || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      quote: document.getElementById("formMppQuote").value.trim() || "Bersama Mahasiswa Membina Masa Depan Gemilang.",
      recentPosts: [
        {
          image: postImg,
          caption: postCaption,
          date: "Terkini",
          likes: "450",
          comments: "25"
        }
      ]
    };

    if (idVal) {
      const index = list.findIndex(m => m.id === parseInt(idVal));
      if (index !== -1) {
        list[index] = { ...list[index], ...memberData };
      }
    } else {
      memberData.id = Date.now();
      list.push(memberData);
    }

    window.mppStorage.saveData(list);
    mppEditModal.classList.remove("active");
    renderMppTable();
    updateOverviewStats();
    alert("Semua maklumat profil ahli MPP berjaya disimpan dan disegerakkan dengan Carta Pokok!");
  });

  // Padam Ahli
  window.deleteMppMember = function(id) {
    if (confirm("Adakah anda pasti mahu memadam profil ahli MPP ini?")) {
      let list = window.mppStorage.getData();
      list = list.filter(m => m.id !== id);
      window.mppStorage.saveData(list);
      renderMppTable();
      updateOverviewStats();
    }
  };

  // Kemaskini Status Tindakan Aduan
  window.openStatusUpdateModal = function(id) {
    const list = window.mppStorage.getComplaints();
    const aduan = list.find(a => a.id === id);
    if (!aduan) return;

    statusAduanId.value = aduan.id;
    statusAduanSubject.textContent = `Aduan: ${aduan.subject} (${aduan.id})`;
    selectNewStatus.value = aduan.status;
    statusModal.classList.add("active");
  };

  statusUpdateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = statusAduanId.value;
    const newStatus = selectNewStatus.value;
    const list = window.mppStorage.getComplaints();
    const index = list.findIndex(a => a.id === id);
    if (index !== -1) {
      list[index].status = newStatus;
      window.mppStorage.saveComplaints(list);
      renderAduanTable();
      updateOverviewStats();
      statusModal.classList.remove("active");
      alert(`Status tindakan aduan ${id} telah ditukar kepada "${newStatus}".`);
    }
  });

  // Padam Rekod Aduan
  window.deleteComplaint = function(id) {
    if (confirm("Adakah anda pasti mahu memadam rekod aduan ini?")) {
      let list = window.mppStorage.getComplaints();
      list = list.filter(a => a.id !== id);
      window.mppStorage.saveComplaints(list);
      renderAduanTable();
      updateOverviewStats();
    }
  };

  // Filter complaints
  aduanStatusFilter.addEventListener("change", renderAduanTable);

  // Close modals
  closeMppModalBtn.addEventListener("click", () => mppEditModal.classList.remove("active"));
  window.addEventListener("click", (e) => {
    if (e.target === mppEditModal) mppEditModal.classList.remove("active");
    if (e.target === statusModal) statusModal.classList.remove("active");
    if (e.target === aduanDetailModal) aduanDetailModal.classList.remove("active");
  });

  // Reset to default
  btnResetDefault.addEventListener("click", () => {
    if (confirm("AMARAN: Ini akan mengembalikan senarai organisasi MPP dan aduan kepada tetapan standard 2026/27. Teruskan?")) {
      window.mppStorage.resetData();
      renderMppTable();
      renderAduanTable();
      updateOverviewStats();
      alert("Data berjaya dikembalikan kepada tetapan standard!");
    }
  });

  // Initial loads
  renderMppTable();
  renderAduanTable();
  updateOverviewStats();
});
