document.addEventListener('DOMContentLoaded', function() {
	const smoothScrollLinks = document.querySelectorAll('a[data-section]');
	
	smoothScrollLinks.forEach(link => {
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