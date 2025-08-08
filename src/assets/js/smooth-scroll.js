document.addEventListener('DOMContentLoaded', function() {
	const footerLinks = document.querySelectorAll('footer a[data-section]');
	
	footerLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			
			const sectionName = this.getAttribute('data-section');
			const targetSection = document.querySelector(`#${sectionName}`);
			
			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});
}); 