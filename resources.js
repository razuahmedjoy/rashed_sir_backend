import { getModelByName } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client';
import AdminJS from 'adminjs';

const prisma = new PrismaClient();

export const resources = [
    {
        resource: { model: getModelByName('Education'), client: prisma },
        options: {
            properties: {
                degree: {
                    isTitle: true,
                },
                short_description: {
                    type: 'textarea', // Use textarea input type
                },
                year: {

                    type: 'string',
                },
                result: {
                    type: 'string',
                }

            },

        }
    },
    {
        resource: { model: getModelByName('Experience'), client: prisma },
        options: {
            properties: {
                position: {
                    isTitle: true,
                },
                responsibilities: {
                    type: 'textarea',
                    isArray: true,
                    custom: {
                        fromForm: (value) => value.split('\n').filter(line => line.trim()),
                        toForm: (value) => value?.join('\n') || ''
                    },
                    props: {
                        rows: 5,
                        placeholder: 'Enter one responsibility per line'
                    },
                    list: {
                        format: (value) => value?.map(item => `• ${item}`).join('\n') || ''
                    },
                    show: {
                        format: (value) => value?.map(item => `• ${item}`).join('\n') || ''
                    }

                }

            },
            listProperties: ['position', 'department', 'institution', 'duration', 'responsibilities'],
            showProperties: ['position', 'department', 'institution', 'duration', 'responsibilities'],
            editProperties: ['position', 'department', 'institution', 'duration', 'responsibilities'],

        }
    },
    {
        resource: {
            model: getModelByName('News'),
            client: prisma,
        },
        options: {
            properties: {
                title: {
                    isTitle: true
                },
                date: {
                    type: 'date',

                },
                link: {
                    type: 'url',
                    isRequired: false
                },
                description: {
                    type: 'textarea'
                },
                createdAt: {
                    isVisible: { list: true, show: true, edit: false }
                }
            },
            listProperties: ['title', 'date', 'link'],
            showProperties: ['title', 'date', 'description', 'link'],
            editProperties: ['title', 'date', 'description', 'link'],
            actions: {
                new: {
                    before: async (request) => {
                        if (!request.payload.link.startsWith('http')) {
                            request.payload.link = `https://${request.payload.link}`;
                        }
                        return request;
                    }
                }
            }
        }
    },
    {
        resource: { model: getModelByName("Publications"), client: prisma },
        options: {
            properties: {

                type: {
                    availableValues: [
                        { value: 'JOURNAL', label: 'Journal' },
                        { value: 'CONFERENCE', label: 'Conference' },
                        { value: 'TECHNICAL_PAPER', label: 'Technical Paper' },
                        { value: 'SURVEY_PAPER', label: 'Survey Paper' }
                    ]
                },
                link: {
                    type: 'url',

                },
                year: {
                    type: 'number',
                    validation: {
                        min: 1900,
                        max: new Date().getFullYear()
                    }
                }
            },
            listProperties: ['id', 'title', 'type', 'authors', 'year'],
            filterProperties: ['title', 'type', 'authors', 'year'],
            editProperties: ['title', 'authors', 'year', 'link', 'type'],
            showProperties: ['id', 'title', 'type', 'authors', 'year', 'link'],
        }
    },
    {
        resource: { model: getModelByName("Project"), client: prisma },
        options: {
            properties: {
                description: {
                    type: 'textarea'
                },
                link: {
                    type: 'url',
                    isRequired: false,

                },
                year: {
                    type: 'number',
                    validation: {
                        min: 2000,
                        max: new Date().getFullYear()
                    }
                },
                createdAt: {
                    isVisible: {
                        list: true,
                        filter: true,
                        show: true,
                        edit: false
                    }
                }
            },
            listProperties: ['title', 'year', 'createdAt'],
            filterProperties: ['title', 'year'],
            editProperties: ['title', 'description', 'year', 'link'],
            showProperties: ['title', 'description', 'year', 'link', 'createdAt']
        }
    },
    {
        resource: { model: getModelByName("ResearchInterest"), client: prisma },
        options: {
            properties: {
                title: {
                    isTitle: true,
                    isRequired: true,

                },

                createdAt: {
                    isVisible: {
                        list: true,
                        filter: true,
                        show: true,
                        edit: false
                    }
                }
            },
            listProperties: ['title', 'createdAt'],
            filterProperties: ['title'],
            editProperties: ['title'],
            showProperties: ['title', 'createdAt']
        }
    },
    {
        resource: { model: getModelByName("ScholarshipAndAwards"), client: prisma },
        options: {
            properties: {
                description: {
                    type: 'textarea'
                },
                year: {
                    type: 'number',
                    validation: {
                        min: 1900,
                        max: new Date().getFullYear()
                    }
                },
                createdAt: {
                    isVisible: {
                        list: true,
                        filter: true,
                        show: true,
                        edit: false
                    }
                }
            },
            listProperties: ['title', 'organization', 'year', 'createdAt'],
            filterProperties: ['title', 'organization', 'year'],
            editProperties: ['title', 'year', 'description', 'organization'],
            showProperties: ['title', 'year', 'description', 'organization', 'createdAt']
        }
    },
    {
        resource: { model: getModelByName("PersonalData"), client: prisma },
        options: {
            properties: {
                id: { isVisible: { list: true, edit: false, show: true } },
                name: { isTitle: true },
                cv_link: { type: "url" },
                email1: { isRequired: true },
                phone: { isRequired: true },
                address: { type: "textarea" },
                linkedin: { type: "url" },
                github: { type: "url" },
                twitter: { type: "url" },
                researchGate: { type: "url" }
            },
            actions: {
                new: { isAccessible: true },
                edit: { isAccessible: true },
                delete: { isAccessible: true },
                list: { isAccessible: true },
                show: { isAccessible: true }
            }
        },
        branding: {
            companyName: "KUET Faculty Portal",
            softwareBrothers: false
        }
    },




]