/* jshint node:true */
module.exports = function( grunt ) {
	'use strict';

	require( 'load-grunt-tasks' )( grunt );
	var rzConfig = {
		// gets the package vars
		pkg: grunt.file.readJSON( 'package.json' ),

		// setting folder templates
		dirs: {
			css: '../app/css',
			js: '../app/js',
			sass: '../assets/rzsass',
			images: '../app/images',
			fonts: '../assets/fonts',
			app: '../app',
			tmp: 'tmp'
		},
		// uglify to concat and minify
		uglify: {
			dist: {
				files: {
					'<%= dirs.js %>/main.min.js': [
						'<%= dirs.js %>/libs/*.js', // External libs/plugins
						'<%= dirs.js %>/main.js'	// Custom JavaScript
					]
				}
			}
		},

		// compile scss/sass files to CSS
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: '<%= dirs.sass %>',
					src: ['*.scss'],
					dest: '<%= dirs.css %>',
					ext: '.css'
				}]
			}
		},

		// watch for changes and trigger sass, jshint, uglify and livereload browser
		watch: {
			sass: {
				files: [
					'<%= dirs.sass %>/**'
				],
				tasks: ['sass', 'ftp-deploy']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'<%= dirs.css %>/*.css',
					'<%= dirs.js %>/*.js',
					'../**/*.php'
				]
			},
			options: {
				spawn: false
			}
		},

		// image optimization
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [{
					expand: true,
					filter: 'isFile',
					cwd: '<%= dirs.images %>/',
					src: '**/*.{png,jpg,gif}',
					dest: '<%= dirs.images %>/'
				}]
			}
		},
		'ftp-deploy': {
		  build: {
			auth: {
			  host: '**HOST**',
			  port: 21,
			  authKey: 'teste'
			},
			src: '../app/',
			dest: '/PATH',
			forceVerbose: true,
			exclusions: [
				'app/.DS_Store',
				'app/**/Thumbs.db'
			]
		  }
		}

	};
	grunt.initConfig( rzConfig );

	// Default Task
	grunt.registerTask( 'default', [

	] );

	grunt.registerTask( 'w', ['watch'] );
	grunt.registerTask( 'f', ['ftp-deploy'] );
};