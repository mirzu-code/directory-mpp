// Logic Paparan Direktori MPP UTHM & Integrasi Instagram / UTHM Community & Sistem Aduan Awam (View dari dalam Website) & Carta Pokok

document.addEventListener("DOMContentLoaded", () => {
  const mppGrid = document.getElementById("mppGrid");
  const countDisplay = document.getElementById("countDisplay");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const departmentFilter = document.getElementById("departmentFilter");
  const facultyFilter = document.getElementById("facultyFilter");
  const noResults = document.getElementById("noResults");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");

  // Carta Pokok Elements
  const orgTreeSection = document.getElementById("orgTreeSection");
  const treeBranchYDP = document.getElementById("treeBranchYDP");
  const treeBranchTYDP = document.getElementById("treeBranchTYDP");
  const treeBranchMT = document.getElementById("treeBranchMT");
  const treeBranchExco = document.getElementById("treeBranchExco");

  // Public Aduan View Elements (View Aduan dari dalam website)
  const publicAduanGrid = document.getElementById("publicAduanGrid");
  const noPublicAduan = document.getElementById("noPublicAduan");
  const publicAduanSearch = document.getElementById("publicAduanSearch");
  const publicAduanFilterStatus = document.getElementById("publicAduanFilterStatus");

  // Modal View Aduan Terperinci Dalam Website
  const websiteAduanModal = document.getElementById("websiteAduanModal");
  const pubDetailSubject = document.getElementById("pubDetailSubject");
  const pubDetailRef = document.getElementById("pubDetailRef");
  const pubDetailStatusBadge = document.getElementById("pubDetailStatusBadge");
  const pubDetailDate = document.getElementById("pubDetailDate");
  const pubDetailStudent = document.getElementById("pubDetailStudent");
  const pubDetailCampus = document.getElementById("pubDetailCampus");
  const pubDetailChannel = document.getElementById("pubDetailChannel");
  const pubDetailContent = document.getElementById("pubDetailContent");
  const pubDetailIgBtn = document.getElementById("pubDetailIgBtn");

  // Complaint Modal Elements
  const complaintModal = document.getElementById("complaintModal");
  const openComplaintModalBtn = document.getElementById("openComplaintModalBtn");
  const closeComplaintModalBtn = document.getElementById("closeComplaintModalBtn");
  const complaintForm = document.getElementById("complaintForm");
  const aduTargetChannel = document.getElementById("aduTargetChannel");
  const aduAnonymousToggle = document.getElementById("aduAnonymousToggle");
  const studentIdentityFields = document.getElementById("studentIdentityFields");
  const aduName = document.getElementById("aduName");
  const aduMatric = document.getElementById("aduMatric");
  const aduEmail = document.getElementById("aduEmail");

  const complaintSuccessBox = document.getElementById("complaintSuccessBox");
  const successComplaintId = document.getElementById("successComplaintId");
  const successChannelName = document.getElementById("successChannelName");
  const successChannelDesc = document.getElementById("successChannelDesc");
  const btnDirectChannelUrl = document.getElementById("btnDirectChannelUrl");
  const btnDirectInstagramAduan = document.getElementById("btnDirectInstagramAduan");
  const copyComplaintText = document.getElementById("copyComplaintText");
  const copyClipBtn = document.getElementById("copyClipBtn");
  const btnNewComplaint = document.getElementById("btnNewComplaint");

  // IG Feed Modal Elements
  const igModal = document.getElementById("igModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalAvatar = document.getElementById("modalAvatar");
  const modalName = document.getElementById("modalName");
  const modalHandle = document.getElementById("modalHandle");
  const modalExternalLink = document.getElementById("modalExternalLink");
  const igFeedContainer = document.getElementById("igFeedContainer");

  // Detail Modal Elements
  const detailModal = document.getElementById("detailModal");
  const closeDetailModalBtn = document.getElementById("closeDetailModalBtn");
  const detailBodyContent = document.getElementById("detailBodyContent");

  // Ambil data dari storan
  let allData = window.mppStorage ? window.mppStorage.getData() : [];
  let channels = window.mppStorage ? window.mppStorage.getChannels() : [];

  // ====================================================================
  // 1. PAPARAN ADUAN TERUS DARI DALAM WEBSITE (PUBLIC ADUAN FEED)
  // ====================================================================
  function renderPublicAduan() {
    const aduanList = window.mppStorage.getComplaints();
    const query = publicAduanSearch.value.toLowerCase().trim();
    const statusFilter = publicAduanFilterStatus.value;

    publicAduanGrid.innerHTML = "";

    const filtered = aduanList.filter(item => {
      const matchSearch =
        item.id.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query) ||
        (item.channelName && item.channelName.toLowerCase().includes(query));

      const matchStatus = statusFilter === "ALL" || item.status === statusFilter;
      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      noPublicAduan.style.display = "block";
      publicAduanGrid.style.display = "none";
      return;
    }

    noPublicAduan.style.display = "none";
    publicAduanGrid.style.display = "grid";

    filtered.forEach(aduan => {
      let statusClass = "badge-pending";
      if (aduan.status === "Dalam Tindakan") statusClass = "badge-investigating";
      if (aduan.status === "Selesai") statusClass = "badge-completed";

      const card = document.createElement("div");
      card.className = "aduan-public-card";
      card.innerHTML = `
        <div class="aduan-card-top">
          <span class="aduan-ticket-ref">${aduan.id}</span>
          <span class="badge-status ${statusClass}">${aduan.status}</span>
        </div>

        <h3 class="aduan-title">${aduan.subject}</h3>
        <p class="aduan-details-snippet">${aduan.details}</p>

        <div class="aduan-channel-pill">
          <i class="fa-solid fa-link"></i> ${aduan.channelName || 'Organisasi MPP UTHM'}
        </div>

        <div class="aduan-footer-meta">
          <span>
            ${aduan.isAnonymous ? '<i class="fa-solid fa-user-secret"></i> Anonymous' : `<i class="fa-regular fa-user"></i> ${aduan.studentName}`} 
            • ${aduan.createdAt ? aduan.createdAt.substring(0, 10) : ''}
          </span>
          <button class="btn-view-aduan-full" onclick="openPublicAduanDetailModal('${aduan.id}')">
            <i class="fa-solid fa-eye"></i> Baca Penuh
          </button>
        </div>
      `;
      publicAduanGrid.appendChild(card);
    });
  }

  // Buka Modal Detail Aduan di Dalam Website Sendiri
  window.openPublicAduanDetailModal = function(id) {
    const list = window.mppStorage.getComplaints();
    const aduan = list.find(a => a.id === id);
    if (!aduan) return;

    pubDetailSubject.textContent = aduan.subject;
    pubDetailRef.textContent = `No Rujukan: ${aduan.id}`;
    pubDetailDate.textContent = aduan.createdAt || "-";
    pubDetailStatusBadge.textContent = aduan.status;
    pubDetailStatusBadge.className = `badge-status ${
      aduan.status === "Selesai" ? "badge-completed" :
      aduan.status === "Dalam Tindakan" ? "badge-investigating" : "badge-pending"
    }`;

    if (aduan.isAnonymous) {
      pubDetailStudent.innerHTML = '<span style="background: #f1f5f9; padding: 2px 8px; border-radius: 6px; font-weight: 700;"><i class="fa-solid fa-user-secret"></i> Anonymous (Identiti Dirahsiakan)</span>';
    } else {
      pubDetailStudent.textContent = `${aduan.studentName} (${aduan.studentMatric})`;
    }

    pubDetailCampus.textContent = aduan.campus || "Kampus Induk Parit Raja";
    pubDetailChannel.textContent = aduan.channelName || "Organisasi MPP UTHM";
    pubDetailContent.textContent = aduan.details;

    if (aduan.channelInstagram) {
      pubDetailIgBtn.href = `https://www.instagram.com/${aduan.channelInstagram}/`;
      pubDetailIgBtn.innerHTML = `<i class="fa-brands fa-instagram"></i> IG: @${aduan.channelInstagram}`;
    } else {
      pubDetailIgBtn.href = `https://www.instagram.com/mpputhm_official/`;
      pubDetailIgBtn.innerHTML = `<i class="fa-brands fa-instagram"></i> @mpputhm_official`;
    }

    websiteAduanModal.classList.add("active");
  };

  publicAduanSearch.addEventListener("input", renderPublicAduan);
  publicAduanFilterStatus.addEventListener("change", renderPublicAduan);

  // ====================================================================
  // 2. TOGGLE PAPARAN CARTA POKOK ORGANISASI (TREE VIEW)
  // ====================================================================
  window.toggleTreeSection = function(forceOpen) {
    if (forceOpen === true) {
      orgTreeSection.style.display = "block";
      orgTreeSection.scrollIntoView({ behavior: 'smooth' });
    } else if (forceOpen === false) {
      orgTreeSection.style.display = "none";
    } else {
      const isHidden = orgTreeSection.style.display === "none";
      orgTreeSection.style.display = isHidden ? "block" : "none";
      if (isHidden) {
        orgTreeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  function renderOrgTree(data) {
    treeBranchYDP.innerHTML = "";
    treeBranchTYDP.innerHTML = "";
    treeBranchMT.innerHTML = "";
    treeBranchExco.innerHTML = "";

    data.forEach(mpp => {
      const tier = mpp.tier || (mpp.position.includes("YDP") && !mpp.position.includes("TYDP") ? "ydp" :
                                mpp.position.includes("TYDP") ? "tydp" :
                                mpp.department === "Majlis Tertinggi" ? "mt" : "exco");

      const node = document.createElement("div");
      node.className = `tree-node-card tier-${tier}`;
      node.onclick = () => window.openDetailModal(mpp.id);
      node.title = `Klik untuk lihat profil penuh ${mpp.name}`;

      let badgeLabel = "EXCO PORTFOLIO";
      if (tier === "ydp") badgeLabel = "YANG DIPERTUA (YDP)";
      else if (tier === "tydp") badgeLabel = "TIMBALAN YDP";
      else if (tier === "mt") badgeLabel = "MAJLIS TERTINGGI";

      node.innerHTML = `
        <span class="node-badge">${badgeLabel}</span>
        <img src="${mpp.avatar}" alt="${mpp.name}" class="node-img" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(mpp.name)}&background=003366&color=fff'">
        <div class="node-name">${mpp.name}</div>
        <div class="node-role">${mpp.position}</div>
        <div class="node-faculty">${mpp.faculty}</div>
      `;

      if (tier === "ydp") {
        treeBranchYDP.appendChild(node);
      } else if (tier === "tydp") {
        treeBranchTYDP.appendChild(node);
      } else if (tier === "mt") {
        treeBranchMT.appendChild(node);
      } else {
        treeBranchExco.appendChild(node);
      }
    });
  }

  // Muatkan pilihan sistem / saluran rasmi di bawah UTHM & Organisasi MPP
  function populateAduanTargetDropdown() {
    aduTargetChannel.innerHTML = "";
    
    const optGroupMpp = document.createElement("optgroup");
    optGroupMpp.label = "--- Organisasi MPP UTHM ---";
    
    const optGroupUthm = document.createElement("optgroup");
    optGroupUthm.label = "--- Pautan Rasmi Sistem / Portal di Bawah UTHM ---";

    channels.forEach(ch => {
      const opt = document.createElement("option");
      opt.value = ch.id;
      opt.textContent = `${ch.name} (${ch.category})`;

      if (ch.isMppOrg) {
        optGroupMpp.appendChild(opt);
      } else {
        optGroupUthm.appendChild(opt);
      }
    });

    aduTargetChannel.appendChild(optGroupMpp);
    aduTargetChannel.appendChild(optGroupUthm);
  }

  // Pengendalian Anonymous Toggle
  aduAnonymousToggle.addEventListener("change", (e) => {
    const isAnon = e.target.checked;
    if (isAnon) {
      aduName.value = "Pelajar Tanpa Nama (Anonymous)";
      aduMatric.value = "DIRAHSIAKAN";
      aduEmail.value = "anonymous@siswa.uthm.edu.my";
      aduName.disabled = true;
      aduMatric.disabled = true;
      aduEmail.disabled = true;
      studentIdentityFields.style.opacity = "0.6";
    } else {
      aduName.value = "";
      aduMatric.value = "";
      aduEmail.value = "";
      aduName.disabled = false;
      aduMatric.disabled = false;
      aduEmail.disabled = false;
      studentIdentityFields.style.opacity = "1";
    }
  });

  // ====================================================================
  // 3. RENDER DIREKTORI KAD BARISAN MPP
  // ====================================================================
  function renderCards(data) {
    mppGrid.innerHTML = "";
    countDisplay.textContent = data.length;

    if (data.length === 0) {
      noResults.style.display = "block";
      mppGrid.style.display = "none";
      return;
    }

    noResults.style.display = "none";
    mppGrid.style.display = "grid";

    data.forEach(mpp => {
      const card = document.createElement("article");
      card.className = "mpp-card";
      card.setAttribute("data-id", mpp.id);

      const latestPost = mpp.recentPosts && mpp.recentPosts.length > 0 ? mpp.recentPosts[0] : null;

      card.innerHTML = `
        <div class="card-header-bar">
          <span class="faculty-badge">${mpp.faculty}</span>
        </div>

        <div class="card-avatar-wrapper">
          <img src="${mpp.avatar}" alt="${mpp.name}" class="card-avatar-img" loading="lazy" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(mpp.name)}&background=003366&color=fff'">
          <div class="ig-verified-pill">
            <i class="fa-brands fa-instagram"></i> @${mpp.instagram}
          </div>
        </div>

        <div class="card-body">
          <h3 class="mpp-name">${mpp.name}</h3>
          <div class="mpp-position">${mpp.position}</div>

          <ul class="mpp-meta-list">
            <li>
              <i class="fa-solid fa-building-columns" title="Fakulti"></i>
              <span><strong>${mpp.faculty}</strong> - ${mpp.facultyFullName || mpp.faculty}</span>
            </li>
            <li>
              <i class="fa-solid fa-briefcase" title="Jabatan / Portfolio"></i>
              <span>${mpp.department}</span>
            </li>
            <li>
              <i class="fa-solid fa-envelope" title="Emel"></i>
              <a href="mailto:${mpp.email}">${mpp.email}</a>
            </li>
            <li>
              <i class="fa-solid fa-id-badge" title="No. Matrik"></i>
              <span>Matrik: ${mpp.matricNo}</span>
            </li>
          </ul>

          <!-- Instagram Direct Feed Component -->
          <div class="mpp-ig-section">
            <div class="ig-feed-header">
              <a href="https://instagram.com/${mpp.instagram}" target="_blank" rel="noopener noreferrer" class="ig-user-tag">
                <i class="fa-brands fa-instagram"></i>
                <span>@${mpp.instagram}</span>
              </a>
              <button class="btn-pull-live" onclick="openInstagramFeedModal(${mpp.id})">
                <i class="fa-solid fa-bolt"></i> Tarik Siaran
              </button>
            </div>

            ${latestPost ? `
              <div class="ig-post-preview" onclick="openInstagramFeedModal(${mpp.id})" title="Klik untuk lihat suapan penuh Instagram">
                <img src="${latestPost.image}" alt="Suapan Terkini" class="ig-thumb" onerror="this.src='https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=100'">
                <div class="ig-post-info">
                  <p class="caption-text">${latestPost.caption}</p>
                  <div class="ig-stats-row">
                    <span><i class="fa-regular fa-heart"></i> ${latestPost.likes}</span>
                    <span><i class="fa-regular fa-comment"></i> ${latestPost.comments}</span>
                    <span>• ${latestPost.date}</span>
                  </div>
                </div>
              </div>
            ` : `
              <p style="font-size: 0.8rem; color: #888;">Tiada kiriman aktif dikesan.</p>
            `}
          </div>

          <div class="card-actions-footer">
            <a href="https://instagram.com/${mpp.instagram}" target="_blank" rel="noopener noreferrer" class="btn-action-ig">
              <i class="fa-brands fa-instagram"></i> Profil IG
            </a>
            <button class="btn-action-view" onclick="openDetailModal(${mpp.id})">
              <i class="fa-regular fa-address-card"></i> Maklumat Penuh
            </button>
          </div>
        </div>
      `;

      mppGrid.appendChild(card);
    });
  }

  // Filter & Search Logic Direktori MPP
  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const dept = departmentFilter.value;
    const faculty = facultyFilter.value;

    clearSearchBtn.style.display = query ? "block" : "none";

    const filtered = allData.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(query) ||
        item.position.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.faculty.toLowerCase().includes(query) ||
        (item.facultyFullName && item.facultyFullName.toLowerCase().includes(query)) ||
        item.email.toLowerCase().includes(query) ||
        item.instagram.toLowerCase().includes(query);

      const matchDept = dept === "ALL" || item.department === dept;
      const matchFaculty = faculty === "ALL" || item.faculty === faculty;

      return matchSearch && matchDept && matchFaculty;
    });

    renderCards(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  departmentFilter.addEventListener("change", applyFilters);
  facultyFilter.addEventListener("change", applyFilters);

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    applyFilters();
    searchInput.focus();
  });

  resetFiltersBtn.addEventListener("click", () => {
    searchInput.value = "";
    departmentFilter.value = "ALL";
    facultyFilter.value = "ALL";
    applyFilters();
  });

  // ====================================================================
  // 4. PENGHANTARAN BORANG ADUAN & SEGERAK PAPARAN AWAM
  // ====================================================================
  complaintForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const isAnon = aduAnonymousToggle.checked;
    const selectedChannelId = aduTargetChannel.value;
    const targetChannel = channels.find(c => c.id === selectedChannelId) || channels[0];

    const now = new Date();
    const ticketId = `ADU-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const sName = isAnon ? "Pelajar Tanpa Nama (Anonymous)" : document.getElementById("aduName").value.trim();
    const sMatric = isAnon ? "DIRAHSIAKAN" : document.getElementById("aduMatric").value.trim().toUpperCase();
    const sEmail = isAnon ? "anonymous@siswa.uthm.edu.my" : document.getElementById("aduEmail").value.trim();

    const complaintObj = {
      id: ticketId,
      isAnonymous: isAnon,
      studentName: sName,
      studentMatric: sMatric,
      studentEmail: sEmail,
      campus: document.getElementById("aduCampus").value,
      channelId: targetChannel.id,
      channelName: targetChannel.name,
      channelUrl: targetChannel.url,
      channelInstagram: targetChannel.instagram || "mpputhm_official",
      subject: document.getElementById("aduSubject").value.trim(),
      details: document.getElementById("aduDetails").value.trim(),
      status: "Baharu",
      createdAt: now.toISOString().replace("T", " ").substring(0, 16)
    };

    // Simpan ke storan (segerak dengan Excel & View Awam)
    window.mppStorage.addComplaint(complaintObj);

    // Kemaskini paparan senarai aduan di dalam website serta-merta
    renderPublicAduan();

    // Paparan maklumat kejayaan
    successComplaintId.textContent = `No Rujukan Aduan: ${ticketId} ${isAnon ? '(Mod Anonymous)' : ''}`;
    successChannelName.textContent = targetChannel.name;
    successChannelDesc.textContent = `${targetChannel.category} • Pautan: ${targetChannel.url}`;
    btnDirectChannelUrl.href = targetChannel.url;
    btnDirectInstagramAduan.href = `https://www.instagram.com/${targetChannel.instagram || 'mpputhm_official'}/`;

    const igMessageDraft = `[ADUAN PELAJAR MPP UTHM 2026/27]
No Tiket: ${ticketId}
Pengadu: ${isAnon ? 'Anonymous (Tanpa Nama)' : `${sName} (${sMatric})`}
Kampus: ${complaintObj.campus}
Saluran Pautan UTHM: ${complaintObj.channelName}
Tajuk: ${complaintObj.subject}
Keterangan: ${complaintObj.details}
(Telah direkodkan dalam sistem pangkalan data Organisasi MPP UTHM)`;

    copyComplaintText.value = igMessageDraft;

    complaintForm.style.display = "none";
    complaintSuccessBox.style.display = "block";
  });

  copyClipBtn.addEventListener("click", () => {
    copyComplaintText.select();
    navigator.clipboard.writeText(copyComplaintText.value);
    copyClipBtn.innerHTML = '<i class="fa-solid fa-check"></i> Berjaya Disalin!';
    setTimeout(() => {
      copyClipBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Salin Teks Aduan';
    }, 2500);
  });

  btnNewComplaint.addEventListener("click", () => {
    complaintForm.reset();
    aduAnonymousToggle.checked = false;
    aduName.disabled = false;
    aduMatric.disabled = false;
    aduEmail.disabled = false;
    studentIdentityFields.style.opacity = "1";
    complaintForm.style.display = "block";
    complaintSuccessBox.style.display = "none";
  });

  openComplaintModalBtn.addEventListener("click", () => {
    populateAduanTargetDropdown();
    complaintForm.style.display = "block";
    complaintSuccessBox.style.display = "none";
    complaintModal.classList.add("active");
  });

  closeComplaintModalBtn.addEventListener("click", () => {
    complaintModal.classList.remove("active");
  });

  // Modal Suapan Instagram
  window.openInstagramFeedModal = function(id) {
    const person = allData.find(p => p.id === id);
    if (!person) return;

    modalAvatar.src = person.avatar;
    modalName.textContent = person.name;
    modalHandle.textContent = `@${person.instagram}`;
    modalExternalLink.href = `https://instagram.com/${person.instagram}`;

    igFeedContainer.innerHTML = "";

    if (person.recentPosts && person.recentPosts.length > 0) {
      person.recentPosts.forEach(post => {
        const feedCard = document.createElement("div");
        feedCard.className = "feed-card";
        feedCard.innerHTML = `
          <div class="feed-card-header">
            <i class="fa-brands fa-instagram" style="color: #e1306c; font-size: 1.1rem;"></i>
            <span>${person.instagram} • Suapan Terkini Instagram</span>
          </div>
          <img src="${post.image}" alt="Instagram Post" class="feed-card-img">
          <div class="feed-card-caption">
            <strong>@${person.instagram}</strong> ${post.caption}
          </div>
          <div class="feed-card-meta">
            <div>
              <i class="fa-solid fa-heart"></i> ${post.likes} sukaan &nbsp;&nbsp;
              <i class="fa-solid fa-comment"></i> ${post.comments} komen
            </div>
            <span>${post.date}</span>
          </div>
        `;
        igFeedContainer.appendChild(feedCard);
      });
    } else {
      igFeedContainer.innerHTML = `<p style="text-align: center; color: #888; padding: 20px;">Tiada siaran suapan dikesan untuk akaun ini.</p>`;
    }

    igModal.classList.add("active");
  };

  // Modal Butiran Penuh Perwakilan
  window.openDetailModal = function(id) {
    const person = allData.find(p => p.id === id);
    if (!person) return;

    detailBodyContent.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px;">
        <img src="${person.avatar}" alt="${person.name}" style="width: 85px; height: 85px; border-radius: 50%; object-fit: cover; border: 3px solid #003366;">
        <div>
          <h3 style="color: #002244; font-size: 1.3rem; margin-bottom: 4px;">${person.name}</h3>
          <p style="color: #b45309; font-weight: 700; margin-bottom: 6px;">${person.position}</p>
          <span style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">${person.faculty} - ${person.facultyFullName || person.faculty}</span>
        </div>
      </div>

      <div style="background: #f8fafc; padding: 16px; border-radius: 12px; margin-bottom: 20px; font-style: italic; border-left: 4px solid #cfa83b; color: #334155;">
        "${person.quote || 'Menerajui Mahasiswa Gemilang UTHM.'}"
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; font-size: 0.9rem;">
        <div>
          <span style="color: #64748b; display: block; font-size: 0.8rem;">Jabatan / Portfolio</span>
          <strong>${person.department}</strong>
        </div>
        <div>
          <span style="color: #64748b; display: block; font-size: 0.8rem;">No. Matrik Pelajar</span>
          <strong>${person.matricNo}</strong>
        </div>
        <div>
          <span style="color: #64748b; display: block; font-size: 0.8rem;">Emel Rasmi MPP</span>
          <strong><a href="mailto:${person.email}" style="color: #003366;">${person.email}</a></strong>
        </div>
        <div>
          <span style="color: #64748b; display: block; font-size: 0.8rem;">Telefon / WhatsApp</span>
          <strong>${person.phone}</strong>
        </div>
        <div style="grid-column: span 2;">
          <span style="color: #64748b; display: block; font-size: 0.8rem;">Lokasi Pejabat / Bilik Gerakan</span>
          <strong>${person.office || 'Bilik Gerakan MPP, Aras 2 HEP'}</strong>
        </div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end; border-top: 1px solid #e2e8f0; padding-top: 16px; flex-wrap: wrap;">
        <a href="https://community.uthm.edu.my" target="_blank" rel="noopener noreferrer" style="background: #003366; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 0.88rem; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-users"></i> UTHM Community
        </a>
        <a href="https://instagram.com/${person.instagram}" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(45deg, #f09433, #dc2743, #bc1888); color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 0.88rem; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-brands fa-instagram"></i> Profil @${person.instagram}
        </a>
      </div>
    `;

    detailModal.classList.add("active");
  };

  // Tutup Modal
  closeModalBtn.addEventListener("click", () => igModal.classList.remove("active"));
  closeDetailModalBtn.addEventListener("click", () => detailModal.classList.remove("active"));

  window.addEventListener("click", (e) => {
    if (e.target === igModal) igModal.classList.remove("active");
    if (e.target === detailModal) detailModal.classList.remove("active");
    if (e.target === complaintModal) complaintModal.classList.remove("active");
    if (e.target === websiteAduanModal) websiteAduanModal.classList.remove("active");
  });

  // Render permulaan
  renderCards(allData);
  renderOrgTree(allData);
  renderPublicAduan();
  populateAduanTargetDropdown();
});
