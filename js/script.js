document.addEventListener('DOMContentLoaded', function() {
    // --- Variáveis Globais ---
    const sections = document.querySelectorAll('.section');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const breadcrumbs = document.getElementById('breadcrumbs');
    const themeToggle = document.querySelector('.theme-toggle');

    let currentGallery = {
        id: null,
        images: [],
        captions: [],
        currentIndex: 0,
        imageElement: null,
        captionElement: null,
        counterElement: null, // For the "current" span
        totalCounterElement: null, // For the "total" span
        prevButton: null,
        nextButton: null,
        thumbnailsContainer: null
    };

    // --- Dados dos passos para cada sistema (Caminhos de imagem corrigidos) ---
    const win7Steps = {
        id: 'win7',
        images: [
            'assets/bios/IMG-20250513-WA0001.jpg',
            'assets/bios/IMG-20250627-WA0017.jpg',
            'assets/bios/IMG-20250627-WA0004.jpg',
            'assets/bios/IMG-20250627-WA0013.jpg',
            'assets/bios/IMG-20250627-WA0008.jpg',
            'assets/bios/IMG-20250627-WA0015.jpg',
            'assets/bios/IMG-20250627-WA0012.jpg',
            'assets/win7/1.png',
            'assets/win7/2.png',
            'assets/win7/3.png',
            'assets/win7/4.png',
            'assets/win7/5.png',
            'assets/win7/6.png',
            'assets/win7/7.png',
            'assets/win7/8.png',
            'assets/win7/9.png',
            'assets/win7/10.png',
            'assets/win7/11.png',
            'assets/win7/12.png',
            'assets/win7/14.png',
        ],
        captions: [
           'Ligue o computador e pressione a tecla para entrar na BIOS (Del ou F2).',
            'Tela da BIOS',
            'Vá na aba Segurança e DESATIVE o Secure Boot ou inicialização segura.',
            'Vá para aba BOOT e ative o modo Legacy (para Windows 7/Debian).',
            'Selecione Boot Priority ou Boot Order: Boot Option 1 e Defina o Pendrive como primeiro dispositivo de boot.',
            'Na aba Sair, clique em Salvar alteraçoes e Reiniciar.',
            'Ou pressione F4 > Salvar configurações e reiniciar > Sim, Reinicie o computador e aguarde a mensagem: Pressione qualquer tecla para iniciar a instalação.',
            'Tela inicial de instalação do Windows 7. Pressione qualquer tecla para iniciar a instalação a partir do Pendrive.',
            'Selecione seu idioma, formato de hora e moeda, e método de entrada do teclado.',
            'Clique em Instalar agora',
            'Leia e aceite os termos de licença para continuar com a instalação.',
            'Escolha Instalação personalizada (avançada) para uma instalação limpa.',
            'Selecione a partição onde o Windows será instalado. Você pode criar, excluir ou formatar partições aqui.',
            'A instalação está em progresso,Isso pode levar vários minutos. Aguarde o carregamento do sistema e tire o PENDRIVE antes do fim do carregamento.',
            'Digite um nome de usuário e nome do computador.',
            'Crie uma senha para sua conta de usuário (opcional, mas recomendado).',
            'Insira sua chave do produto para ativar o Windows (pode ser feito mais tarde).',
            'Instalar somente atualizações importantes.',
            'Verifique as configurações de data e hora e ajuste se necessário.',
            'Selecione o local da rede (Casa, Trabalho ou Público) para configurações de firewall apropriadas.',
            'Instalação concluída! Esta é a área de trabalho do Windows 7.',
        ]
    };

    const win10Steps = {
        id: 'win10',
        images: [
            'assets/bios/IMG-20250513-WA0001.jpg',
            'assets/bios/IMG-20250627-WA0017.jpg',
            'assets/bios/IMG-20250627-WA0004.jpg',
            'assets/bios/IMG-20250627-WA0010.jpg',
            'assets/bios/IMG-20250627-WA0008.jpg',
            'assets/bios/IMG-20250627-WA0015.jpg',
            'assets/bios/IMG-20250627-WA0012.jpg',
            'assets/win10/1.png',
            'assets/win10/2Win10.png',
            'assets/win10/2 (1).png',
            'assets/win10/3 (1).png',
            'assets/win10/4.png',
            'assets/win10/5 (1).png',
            'assets/win10/6 (1).png',
            'assets/win10/7 (1).png',
            'assets/win10/8 (1).png',
            'assets/win10/9 (1).png',
            'assets/win10/11 (1).png',
            'assets/win10/12 (1).png',
            'assets/win10/14 (1).png',
            'assets/win10/19 (1).png',
            'assets/win10/20 (1).png',
        ],
        captions: [
            'Ligue o computador e pressione a tecla para entrar na BIOS (Del ou F2).',
            'Tela da BIOS',
            'Vá na aba Segurança e DESATIVE o Secure Boot ou inicialização segura.',
            'Vá para aba BOOT e ative o modo UEFI (para Windows 10 e 11/Ubuntu).',
            'Selecione Boot Priority ou Boot Order: Boot Option 1 e Defina o Pendrive como primeiro dispositivo de boot.',
            'Na aba Sair, clique em Salvar alteraçoes e Reiniciar.',
            'Ou pressione F4 > Salvar configurações e reiniciar > Sim, Reinicie o computador e aguarde a mensagem: Pressione qualquer tecla para iniciar a instalação.',
            "Selecione idioma/teclado.",
            "Clique Instalar agora.",
            "Clique em Não tenho a chave do produto",
            "Escolha edição (Home/Pro).",
            "Aceite termos de licença.",
            "Selecione Instalação Personalizada.",
            "Selecione a partição onde o Windows será instalado. Você pode criar, excluir ou formatar partições aqui.",
            "Aguarde a instalação (pode levar vários minutos)",
            "Aguarde o carregamento do sistema e tire o PENDRIVE antes do fim do carregamento",
            "Configurações iniciais",
            "Escolha região (Brasil)",
            "Layout teclado (ABNT2)",
            "Aguarde a tela de Configurações importantes e prossiga as etapas (Conta, Localização, Dados de diagnóstico, Nome de usuário e Pin) de acordo com suas preferências",
            "Aguarde essa tela",
            "Instalação concluída! Esta é a área de trabalho do Windows 10.",
            ]
       };

    const win11Steps = {
        id: 'win11',
        images: [
            'assets/bios/IMG-20250513-WA0001.jpg',
            'assets/bios/IMG-20250627-WA0017.jpg',
            'assets/bios/IMG-20250627-WA0004.jpg',
            'assets/bios/IMG-20250627-WA0010.jpg',
            'assets/bios/IMG-20250627-WA0008.jpg',
            'assets/bios/IMG-20250627-WA0015.jpg',
            'assets/bios/IMG-20250627-WA0012.jpg',
            'assets/win11/1.png',
            'assets/win11/2.png',
            'assets/win11/3.png',
            'assets/win11/4.png',
            'assets/win11/5.png',
            'assets/win11/6.png',
            'assets/win11/7.png',
            'assets/win11/8.png',
            'assets/win11/9.png',
            'assets/win11/10.png',
            'assets/win11/12.png',
            'assets/win11/13.png',
            'assets/win11/14.png',
            'assets/win11/20.png', // Corrigido para '20.png'
            'assets/win11/Screenshot_20250627-141831_YouTube Premium.jpg',
        ],
        captions: [
            'Ligue o computador e pressione a tecla para entrar na BIOS (Del ou F2).',
            'Tela da BIOS',
            'Vá na aba Segurança e ATIVE o Secure Boot ou inicialização segura e TPM 2.0.',
            'Vá para aba BOOT e ative o modo UEFI (para Windows 10/11 e Ubuntu).',
            'Selecione Boot Priority ou Boot Order: Boot Option 1 e Defina o Pendrive como primeiro dispositivo de boot.',
            'Na aba Sair, clique em Salvar alteraçoes e Reiniciar.',
            'Ou pressione F4 > Salvar configurações e reiniciar > Sim, Reinicie o computador e aguarde a mensagem: Pressione qualquer tecla para iniciar a instalação.',
            "Pressione qualquer tecla para bootar.",
            "Selecione idioma e formato de hora e moeda",
            "Selecione o teclado ou método de entrada",
            "Selecione Instalar o Windows 11 e avance",
            "Clique em Não tenho a chave do produto",
            "Escolha edição (Home/Pro)",
            "Aceite termos de licença.",
            "Selecione a partição onde o Windows será instalado. Você pode criar, excluir ou formatar partições aqui.",
            "Selecione as duas opções e clique em instalar",
            "Aguarde o carregamento do sistema e tire o PENDRIVE antes do fim do carregamento",
            "Instalando",
            "Escolha região (Brasil)",
            "Layout teclado (ABNT2)",
            "Aguarde a tela de Configurações importantes e prossiga as etapas (Conta,Localização, Dados de diagnóstico, Nome de usuário e Pin) de acordo com suas preferências",
            "Aguarde essa tela",
            "Instalação concluída! Esta é a área de trabalho do Windows 11.",
        ]
    };

    const debianSteps = {
        id: 'debian',
        images: [
            'assets/bios/IMG-20250513-WA0001.jpg',
            'assets/bios/IMG-20250627-WA0017.jpg',
            'assets/bios/IMG-20250627-WA0004.jpg',
            'assets/bios/IMG-20250627-WA0013.jpg',
            'assets/bios/IMG-20250627-WA0008.jpg',
            'assets/bios/IMG-20250627-WA0015.jpg',
            'assets/bios/IMG-20250627-WA0012.jpg',
            'assets/debian/1-l.jpg', // Corrigido para '1-l.jpg'
            'assets/debian/1.png',
            'assets/debian/2.png',
            'assets/debian/3.png',
            'assets/debian/5.png',
            'assets/debian/6.png',
            'assets/debian/7.png',
            'assets/debian/8.png',
            'assets/debian/9.png',
            'assets/debian/10.png',
            'assets/debian/11.png',
            'assets/debian/12.png',
            'assets/debian/13.png',
            'assets/debian/14.png',
            'assets/debian/15.png',
            'assets/debian/16.png',
            'assets/debian/17.png',
            'assets/debian/18.png',
            'assets/debian/19.png',
            'assets/debian/20.png',
            'assets/debian/21.png',
            'assets/debian/22.png',
            'assets/debian/24.png',
            'assets/debian/25.png',
            'assets/debian/26.png',
            'assets/debian/28.png',
            'assets/debian/29.png',
        ],
        captions: [
           'Ligue o computador e pressione a tecla para entrar na BIOS (Del ou F2).',
            'Tela da BIOS',
            'Vá na aba Segurança e DESATIVE o Secure Boot ou inicialização segura.',
            'Vá para aba BOOT e ative o modo Legacy (para Windows 7/Debian).',
            'Selecione Boot Priority ou Boot Order: Boot Option 1 e Defina o Pendrive como primeiro dispositivo de boot.',
            'Na aba Sair, clique em Salvar alteraçoes e Reiniciar.',
            'Ou pressione F4 > Salvar configurações e reiniciar > Sim, Reinicie o computador e aguarde a mensagem: Pressione qualquer tecla para iniciar a instalação.',
            "No menu Grub, selecione Install.",
            "Escolha idioma (Português).",
            "Selecione região (Brasil).",
            "Defina layout de teclado (Português-Brasil).",
            "Configure hostname (ex: debian-pc).",
            "Domínio (deixe em branco se for doméstico).",
            "Crie senha de root.",
            "Adicione usuário principal.",
            "Configure o usuário.",
            "Configure a senha.",
            "Configure o Relógio.",
            "Partição discos. Se você for iniciante, opte por usar o disco inteiro.",
            "Selecione disco (/dev/sda normalmente).",
            "Selecione o esquema de particionamento (O particionamento para Inciantes é o mais recomendado).",
            "Finalize o Particionamento.",
            "Confirme alterações (Finish partitioning)",
            "Clique NÃO em Ler mídias de instalação adicional.",
            "Configure o gerenciador de pacotes (Brasil).",
            "Configure o gerenciador de pacotes (Espelho do Repositório do Debian - deb.debian.org).",
            "Deixe essa parte em branco e continue.",
            "Pule essa etapa e continue.",
            "Escolha o ambente de trabalho no Debian (GNOME).",
            "Instale GRUB no seu disco primário.",
            "Selecione /dev/sda para GRUB.",
            "Conclua instalação",
            "Login com usuário criado. Coloque a senha que você criou",
            "Debian instalado e pronto para uso.",
        ]
    };

    const ubuntuSteps = {
        id: 'ubuntu',
        images: [
            'assets/bios/IMG-20250513-WA0001.jpg',
            'assets/bios/IMG-20250627-WA0017.jpg',
            'assets/bios/IMG-20250627-WA0004.jpg',
            'assets/bios/IMG-20250627-WA0010.jpg',
            'assets/bios/IMG-20250627-WA0008.jpg',
            'assets/bios/IMG-20250627-WA0015.jpg',
            'assets/bios/IMG-20250627-WA0012.jpg',
            'assets/ubuntu/1-1.png', // Corrigido para '1-1.png'
            'assets/ubuntu/2.png',
            'assets/ubuntu/3.png',
            'assets/ubuntu/4.png',
            'assets/ubuntu/5.png',
            'assets/ubuntu/6.png',
            'assets/ubuntu/7.png',
            'assets/ubuntu/8.png',
            'assets/ubuntu/9.png',
            'assets/ubuntu/10.png',
            'assets/ubuntu/11.png',
            'assets/ubuntu/12.png',
            'assets/ubuntu/13.png',
            'assets/ubuntu/14.png',
            'assets/ubuntu/15.png',
            'assets/ubuntu/16.png',
            'assets/ubuntu/Screenshot_20250627-134630_YouTube Premium.jpg',
          
        ],
        captions: [
           'Ligue o computador e pressione a tecla para entrar na BIOS (Del ou F2).',
            'Tela da BIOS',
            'Vá na aba Segurança e DESATIVE o Secure Boot ou inicialização segura.',
            'Vá para aba BOOT e ative o modo UEFI (para Windows 10 e 11/Ubuntu).',
            'Selecione Boot Priority ou Boot Order: Boot Option 1 e Defina o Pendrive como primeiro dispositivo de boot.',
            'Na aba Sair, clique em Salvar alteraçoes e Reiniciar.',
            'Ou pressione F4 > Salvar configurações e reiniciar > Sim, Reinicie o computador e aguarde a mensagem: Pressione qualquer tecla para iniciar a instalação.',
            "Inicie o instalador (clique no ícone try Ubuntu).",
            "Escolha o idioma.",
            "Em Acessibilidade para Ubuntu, apenas clique em proximo",
            "layout do teclado para Português-Brasil).",
            'Se voce tiver internet conecte-se nela, se não tiver, clique em não quero conectar à internet neste momento',
            "Selecione instalar Ubuntu",
            "Selecione Instalação interativa",
            "Escolha o tipo de Instalação que você deseja(Padrão ou Completa)",
            "Instalar Software Proprietário Recomendado, fica a escolha do usuário",
            "Escolha o tipo de Particionamento. Escolha a primeira opção se for instalar apenas o Ubuntu, caso for fazer Dual Boot, escolha a segunda opção",
            "Configure sua conta",
            "Defina o fuso horário (Brasil).",                                  
            "Revise suas escolhas",
            "Reinicie agora.",
            "Remova o Pendrive, pressione o botão ENTER e aguarde a instalação .",
            "Faça login com a senha criada.",
            "Ubuntu instalado e pronto para uso.",
        ]
    };

    // NOVOS DADOS PARA DUAL BOOT WINDOWS + DEBIAN (Caminhos de imagem corrigidos)
    const dualbootWindowsDebianSteps = {
        id: 'dualboot-windows-debian',
        images: [
            'assets/Dual Boot/1 (1).png',
            'assets/Dual Boot/2 (1).png',
            'assets/Dual Boot/3 (1).png',
            'assets/Dual Boot/4 (1).png',
            'assets/Dual Boot/5 (1).png',
            'assets/Dual Boot/6 (1).png',
            'assets/Dual Boot/7 (1).png',
            'assets/Dual Boot/8 (1).png',
            'assets/Dual Boot/9 (1).png',
        ],
        captions: [
            'Começe instalando o Windows. Preparação do Windows: Reduza a partição do Windows para criar espaço livre em EXCLUIR. Clique em NOVO e coloque quantos GBS de memória você quer que cada Sistema Operacional tenha, por exemplo, se você tem um SSD 500GB coloque 250GB para cada Sistema',
            'As patições criadas ficarão assim como na imagem, o segundo Sistema Operacional ficará no Espaço não alocado da unidade e conclua a instalação do Windows',
            'Boot pelo Pendrive Debian: Reinicie o computador e configure a BIOS para inicializar pelo pendrive que contém o instalador do Debian. Particionamento no Debian: Durante a instalação do Debian, selecione a opção de particionamento "Manual". Use o espaço livre que você criou no Passo 1 para instalar o Debian.',
            'Clique em ESPAÇO LIVRE para que o Sistema Operacional seja instalado nesse espaço e continue',
            'Clique em particionar automaticamente o espaço livre e continue',
            'Clique em Todos os arquivos em uma partição e continue',
            'Clique em Finalizar o particionamento e escrever as mudanças no disco',
            'Escreva as mudanças nos discos e conclua a instalação do Debian',
            'Ao reiniciar, você deverá ver o menu do GRUB, onde poderá selecionar entre iniciar o Windows ou o Debian. Para selecionar um dos Sistemas clique na seta ↓ e ENTER no teclado'
        ]
    };

    // NOVOS DADOS PARA DICAS DE MANUTENÇÃO (Caminhos de imagem corrigidos)
    const dicasManutencaoSteps = {
        id: 'dicas-manutencao',
        images: [
            'assets/Dicas de Manutencao/IMG-20250630-WA0007.jpg',
            'assets/Dicas de Manutencao/IMG-20250630-WA0011.jpg',
            'assets/Dicas de Manutencao/IMG-20250630-WA0009.jpg',
            'assets/Dicas de Manutencao/IMG-20250630-WA0010.jpg',
            'assets/manutencao/backup_dados.jpg',
            'assets/manutencao/verificacao_hardware.jpg'
        ],
        captions: [
            'Limpeza Física: Regularmente, limpe o interior do seu computador para remover poeira dos componentes, especialmente ventoinhas e dissipadores. Isso ajuda a prevenir superaquecimento.',
            'Verificar a estabalidade dos componentes: Mantenha a Memoria Ram bem encaixada no Slot. Isso garante melhor desempenho, segurança e compatibilidade.',
            'Aplicação de pasta termica: Espalhe bem a pasta termica por toda a superficie do núcleo para que o calor seja dissipado e tenha um melhor desepenho nas tarefas.',
            'Cabo SATA: Verificar se o cabo SATA foi bem instalado no SSD OU HD, unindo-o com a placa mãe.',
            'Backup Regular de Dados: Crie o hábito de fazer backup de seus arquivos importantes em um disco externo, nuvem ou outro local seguro. Isso é essencial em caso de falha do sistema ou hardware.',
            'Monitoramento de Hardware: Fique atento a ruídos estranhos, superaquecimento incomum ou lentidão repentina. Ferramentas de monitoramento podem ajudar a identificar problemas antes que se tornem graves.'
        ]
    };


    // --- Funções de Navegação e UI ---

    function showAndCloseMenu(id) {
        showOnly(id); // Chama a função original para mostrar a seção
        if (sidebar.classList.contains('open')) { // Verifica se o menu está aberto
            toggleMenu(); // Fecha o menu
        }
        // Se a seção for uma galeria, garante que ela seja configurada
        const galleryData = getGalleryDataById(id);
        if (galleryData) {
            setupGallery(galleryData);
        }
    }


    function showOnly(id) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(id);
        if (activeSection) {
            activeSection.classList.add('active');
            updateBreadcrumbs(id);
            // Rolagem para o topo da seção
            activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function updateBreadcrumbs(currentSectionId) {
        let path = [{ id: 'formatacao', name: 'Início', icon: 'fas fa-home' }];

        if (currentSectionId === 'bios') {
            path.push({ id: 'bios', name: 'BIOS', icon: 'fas fa-microchip' });
        } else if (currentSectionId === 'sistemas') {
            path.push({ id: 'sistemas', name: 'Sistemas Operacionais', icon: 'fas fa-desktop' });
        } else if (currentSectionId === 'windows') {
            path.push({ id: 'sistemas', name: 'Sistemas Operacionais', icon: 'fas fa-desktop' });
            path.push({ id: 'windows', name: 'Windows', icon: 'fab fa-windows' });
        } else if (currentSectionId === 'linux') {
            path.push({ id: 'sistemas', name: 'Sistemas Operacionais', icon: 'fas fa-desktop' });
            path.push({ id: 'linux', name: 'Linux', icon: 'fab fa-linux' });
        } else if (currentSectionId.startsWith('win')) { // win7, win10, win11
            path.push({ id: 'sistemas', name: 'Sistemas Operacionais', icon: 'fas fa-desktop' });
            path.push({ id: 'windows', name: 'Windows', icon: 'fab fa-windows' });
            path.push({ id: currentSectionId, name: `Windows ${currentSectionId.slice(3)}`, icon: 'fab fa-windows' });
        } else if (currentSectionId === 'debian' || currentSectionId === 'ubuntu') {
            path.push({ id: 'sistemas', name: 'Sistemas Operacionais', icon: 'fas fa-desktop' });
            path.push({ id: 'linux', name: 'Linux', icon: 'fab fa-linux' });
            path.push({ id: currentSectionId, name: currentSectionId.charAt(0).toUpperCase() + currentSectionId.slice(1), icon: `fab fa-${currentSectionId}` });
        } else if (currentSectionId === 'dualboot-options') {
            path.push({ id: 'sistemas', name: 'Sistemas Operacionais', icon: 'fas fa-desktop' });
            path.push({ id: 'dualboot-options', name: 'Dual Boot', icon: 'fas fa-grip-horizontal' });
        } else if (currentSectionId === 'dualboot-windows-debian') {
            path.push({ id: 'sistemas', name: 'Sistemas Operacionais', icon: 'fas fa-desktop' });
            path.push({ id: 'dualboot-options', name: 'Dual Boot', icon: 'fas fa-grip-horizontal' });
            path.push({ id: 'dualboot-windows-debian', name: 'Windows + Debian', icon: 'fab fa-windows fas fa-plus fab fa-debian' }); // Ícone composto
        } else if (currentSectionId === 'dicas-manutencao') {
            path.push({ id: 'dicas-manutencao', name: 'Dicas de Manutenção', icon: 'fas fa-tools' });
        } else if (currentSectionId === 'sobre') {
            path.push({ id: 'sobre', name: 'Sobre', icon: 'fas fa-info-circle' });
        }

        breadcrumbs.innerHTML = '';
        path.forEach((item, index) => {
            const link = document.createElement('a');
            link.href = `#${item.id}`;
            link.onclick = (e) => {
                e.preventDefault();
                showOnly(item.id);
                // Se for uma galeria, inicializa ela (isto será tratado na showOnly e nas funções showXVersion)
                if (item.id === 'win7' || item.id === 'win10' || item.id === 'win11') {
                    showWindowsVersion(item.id);
                } else if (item.id === 'debian' || item.id === 'ubuntu') {
                    showLinuxVersion(item.id);
                } else if (item.id === 'dualboot-windows-debian') {
                    showDualbootVersion(item.id);
                } else if (item.id === 'dicas-manutencao') {
                    showDicasManutencao();
                }
            };
            link.innerHTML = `<i class="${item.icon}"></i> <span>${item.name}</span>`;
            breadcrumbs.appendChild(link);

            if (index < path.length - 1) {
                const separator = document.createElement('span');
                separator.innerHTML = '<i class="fas fa-chevron-right"></i>';
                breadcrumbs.appendChild(separator);
            }
        });
    }

    function toggleMenu() {
        sidebar.classList.toggle('open');
        menuToggle.classList.toggle('open');
        const isExpanded = sidebar.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    }

    function toggleTheme() {
        const html = document.documentElement;
        if (html.getAttribute('data-theme') === 'light') {
            html.removeAttribute('data-theme'); // Volta para o padrão (dark)
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua para indicar que está no tema escuro
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone de sol para indicar que está no tema claro
        }
    }

    // --- Funções da Galeria de Imagens (Reaproveitadas) ---

    function setupGallery(galleryData) {
        currentGallery.id = galleryData.id;
        currentGallery.images = galleryData.images;
        currentGallery.captions = galleryData.captions;
        currentGallery.currentIndex = 0; // Sempre começa no primeiro passo ao configurar uma nova galeria

        currentGallery.imageElement = document.getElementById(`${galleryData.id}-image`);
        currentGallery.captionElement = document.getElementById(`${galleryData.id}-caption`);
        currentGallery.counterElement = document.getElementById(`${galleryData.id}-current`); // For the "current" span
        currentGallery.totalCounterElement = document.getElementById(`${galleryData.id}-total`); // For the "total" span


        currentGallery.prevButton = document.getElementById(`${galleryData.id}-prev`);
        currentGallery.nextButton = document.getElementById(`${galleryData.id}-next`);
        currentGallery.thumbnailsContainer = document.getElementById(`${galleryData.id}-thumbnails`);

        // Remove listeners antigos antes de adicionar novos para evitar duplicação
        if (currentGallery.prevButton) currentGallery.prevButton.onclick = null;
        if (currentGallery.nextButton) currentGallery.nextButton.onclick = null;

        // Adiciona listeners para os botões de navegação da galeria
        if (currentGallery.prevButton) currentGallery.prevButton.onclick = () => prevImage(currentGallery.id);
        if (currentGallery.nextButton) currentGallery.nextButton.onclick = () => nextImage(currentGallery.id);

        updateGalleryUI(currentGallery.id);
        createThumbnails(currentGallery.id);
    }

    function getGalleryDataById(galleryId) {
        switch(galleryId) {
            case 'win7': return win7Steps;
            case 'win10': return win10Steps;
            case 'win11': return win11Steps;
            case 'debian': return debianSteps;
            case 'ubuntu': return ubuntuSteps;
            case 'dualboot-windows-debian': return dualbootWindowsDebianSteps;
            case 'dicas-manutencao': return dicasManutencaoSteps;
            default: return null;
        }
    }

    function updateGalleryUI(galleryId) {
        const galleryData = getGalleryDataById(galleryId);
        if (!galleryData) return;

        const imageElement = document.getElementById(`${galleryId}-image`);
        const captionElement = document.getElementById(`${galleryId}-caption`);
        const currentCounter = document.getElementById(`${galleryId}-current`);
        const totalCounter = document.getElementById(`${galleryId}-total`);
        const prevButton = document.getElementById(`${galleryId}-prev`);
        const nextButton = document.getElementById(`${galleryId}-next`);
        const thumbnailsContainer = document.getElementById(`${galleryId}-thumbnails`);

        // Verifique se os elementos existem antes de tentar acessá-los
        if (imageElement) {
            imageElement.src = galleryData.images[currentGallery.currentIndex];
            // Carregamento lazy (opcional, já está no CSS)
            if (imageElement.complete) {
                imageElement.classList.add('loaded');
            } else {
                imageElement.addEventListener('load', function() {
                    this.classList.add('loaded');
                }, { once: true });
            }
        }
        if (captionElement) {
            captionElement.innerHTML = `<strong>Passo ${currentGallery.currentIndex + 1}:</strong> ${galleryData.captions[currentGallery.currentIndex]}`;
        }
        if (currentCounter) {
            currentCounter.textContent = currentGallery.currentIndex + 1;
        }
        if (totalCounter) {
            totalCounter.textContent = galleryData.images.length;
        }

        // Desabilita/Habilita botões de navegação
        if (prevButton) {
            prevButton.disabled = (currentGallery.currentIndex === 0);
        }
        if (nextButton) {
            nextButton.disabled = (currentGallery.currentIndex === galleryData.images.length - 1);
        }

        // Atualiza a classe 'active' das thumbnails
        if (thumbnailsContainer) {
            const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
            thumbnails.forEach((thumb, index) => {
                if (index === currentGallery.currentIndex) {
                    thumb.classList.add('active');
                    // Rolagem da thumbnail ativa para o centro da visualização
                    thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                } else {
                    thumb.classList.remove('active');
                }
            });
        }
    }

    function nextImage(galleryId) {
        const galleryData = getGalleryDataById(galleryId);
        if (!galleryData) return;

        if (currentGallery.currentIndex < galleryData.images.length - 1) {
            currentGallery.currentIndex++;
            updateGalleryUI(galleryId);
        }
    }

    function prevImage(galleryId) {
        const galleryData = getGalleryDataById(galleryId);
        if (!galleryData) return;

        if (currentGallery.currentIndex > 0) {
            currentGallery.currentIndex--;
            updateGalleryUI(galleryId);
        }
    }

    function createThumbnails(galleryId) {
        const galleryData = getGalleryDataById(galleryId);
        if (!galleryData) return;

        const thumbnailsContainer = document.getElementById(`${galleryId}-thumbnails`);
        if (!thumbnailsContainer) return; // Adicionado verificação de null

        thumbnailsContainer.innerHTML = ''; // Limpa thumbnails antigas

        galleryData.images.forEach((imageSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imageSrc;
            thumb.alt = `Miniatura do passo ${index + 1}`;
            thumb.classList.add('thumbnail');
            if (index === currentGallery.currentIndex) {
                thumb.classList.add('active');
            }
            thumb.onclick = () => {
                currentGallery.currentIndex = index;
                updateGalleryUI(galleryId);
            };
            thumbnailsContainer.appendChild(thumb);
        });
    }

    // --- Funções para exibir versões específicas (chamam setupGallery) ---
    function showWindowsVersion(versionId) {
        showOnly(versionId); // Ativa a seção da versão do Windows
        if (versionId === 'win7') {
            setupGallery(win7Steps);
        } else if (versionId === 'win10') {
            setupGallery(win10Steps);
        } else if (versionId === 'win11') {
            setupGallery(win11Steps);
        } else if (versionId === 'windows') { // Se o botão "Windows" genérico for clicado
            // Não faz nada aqui, pois o clique dele leva para a seção "windows" que lista as versões.
            // A galeria só é configurada ao clicar nas versões específicas (win7, win10, win11).
        }
    }

    function showLinuxVersion(versionId) {
        showOnly(versionId); // Ativa a seção da versão do Linux
        if (versionId === 'debian') {
            setupGallery(debianSteps);
        } else if (versionId === 'ubuntu') {
            setupGallery(ubuntuSteps);
        } else if (versionId === 'linux') { // Se o botão "Linux" genérico for clicado
            // Não faz nada aqui, pois o clique dele leva para a seção "linux" que lista as distribuições.
            // A galeria só é configurada ao clicar nas distribuições específicas (debian, ubuntu).
        }
    }

    function showDualbootVersion(versionId) {
        showOnly(versionId); // Ativa a seção da versão do Dual Boot
        if (versionId === 'dualboot-windows-debian') {
            setupGallery(dualbootWindowsDebianSteps);
        }
    }
    
    // NOVA FUNÇÃO PARA DICAS DE MANUTENÇÃO
    function showDicasManutencao() {
        showOnly('dicas-manutencao'); // Ativa a seção de Dicas de Manutenção
        setupGallery(dicasManutencaoSteps); // Configura a galeria de dicas
    }

    // Expor funções globalmente para onclick no HTML
    window.showOnly = showOnly;
    window.toggleMenu = toggleMenu;
    window.toggleTheme = toggleTheme;
    window.showWindowsVersion = showWindowsVersion;
    window.showLinuxVersion = showLinuxVersion;
    window.showDualbootVersion = showDualbootVersion;
    window.showDicasManutencao = showDicasManutencao; // Expõe a nova função
    window.showAndCloseMenu = showAndCloseMenu; // Expõe a nova função

    // Navegação de galeria (prev/next) também precisa ser global ou ter listeners adicionados dinamicamente
    window.prevImage = prevImage;
    window.nextImage = nextImage;
    
    // --- Inicialização ---
    // Carrega o tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Observer para o progress bar (apenas para a seção de formatação)
    const formatacaoSection = document.getElementById('formatacao');
    const formatacaoProgressBar = document.getElementById('formatacao-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                formatacaoProgressBar.style.width = '100%';
            } else {
                formatacaoProgressBar.style.width = '0%';
            }
        });
    }, {
        threshold: 0.5 // Aciona quando 50% da seção está visível
    });

    if (formatacaoSection) {
        observer.observe(formatacaoSection);
    }

    // Marcar o link ativo na sidebar na inicialização
    const currentHash = window.location.hash.substring(1) || 'formatacao';
    const initialActiveLink = document.querySelector(`.sidebar a[href="#${currentHash}"]`);
    if (initialActiveLink) {
        initialActiveLink.classList.add('active');
    }
    // Chama showOnly para a seção inicial e configura a galeria se for uma
    showOnly(currentHash);

    // Re-configura as galerias no carregamento, caso o hash inicial seja uma galeria
    const galleryIds = ['win7', 'win10', 'win11', 'debian', 'ubuntu', 'dualboot-windows-debian', 'dicas-manutencao'];
    if (galleryIds.includes(currentHash)) {
        setupGallery(getGalleryDataById(currentHash));
    }
    
    // **NOVO: Adiciona atalhos do teclado para as galerias**
    document.addEventListener('keydown', function(event) {
        // Verifica se uma galeria está ativa e visível
        if (currentGallery.id && document.getElementById(currentGallery.id).classList.contains('active')) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault(); // Impede a rolagem da página
                prevImage(currentGallery.id);
            } else if (event.key === 'ArrowRight') {
                event.preventDefault(); // Impede a rolagem da página
                nextImage(currentGallery.id);
            }
        }
    });
});
zz