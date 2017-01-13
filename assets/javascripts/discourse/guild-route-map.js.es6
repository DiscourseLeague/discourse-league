export default function(){
	this.route('guild', function(){
		this.route('level', {path: '/l' }, function(){
			this.route('show', {path: '/:slug/:id'});
		});
		this.route('page', {path: '/p' }, function(){
			this.route('show', {path: '/:slug/:id'});
		});
	});
};